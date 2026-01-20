import axios from "axios";
import { useState, useEffect } from "react";

interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
}

interface PokemonDetails {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: { type: { name: string } }[];
  moves: { move: { name: string } }[];
  abilities: { ability: { name: string; url: string }; is_hidden: boolean }[];
  height: number;
  weight: number;
  stats: { base_stat: number; stat: { name: string } }[];
}

interface AbilityDetails {
  name: string;
  effect: string;
}

const API_BASE = "https://pokeapi.co/api/v2";

export const usePokemonList = (selectedType: string) => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const LIMIT = 10;

  const fetchPokemonDetails = async (url: string): Promise<Pokemon | null> => {
    try {
      // tipagem generic pra ajudar o ts a entender com precisão oque está na variável
      const { data } = await axios.get<PokemonDetails>(url);

      return {
        id: data.id,
        name: data.name,
        image:
          data.sprites.other["official-artwork"].front_default ||
          data.sprites.front_default,
        types: data.types.map((t) => t.type.name),
      };
    } catch (err) {
      console.error("Error on fetch pokemon details", err);
      return null;
    }
  };

  const fetchByType = async (type: string) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_BASE}/type/${type}`);

      const pokemonUrls = data.pokemon
        .slice(0, LIMIT)
        .map((p: { pokemon: { url: string } }) => p.pokemon.url);

      const details = await Promise.all(pokemonUrls.map(fetchPokemonDetails));

      setPokemon(details.filter(Boolean) as Pokemon[]);
      setOffset(LIMIT);
      setHasMore(data.pokemon.length > LIMIT);
    } catch (err) {
      console.error("Error fetching by type:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAll = async (newOffset: number, append: boolean = false) => {
    if (append) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }

    try {
      const { data } = await axios.get(
        `${API_BASE}/pokemon?limit=${LIMIT}&offset=${newOffset}`,
      );

      const details = await Promise.all(
        data.results.map((p: { url: string }) => fetchPokemonDetails(p.url)),
      );
      const validPokemon = details.filter(Boolean) as Pokemon[];

      if (append) {
        setPokemon((prev) => [...prev, ...validPokemon]);
      } else {
        setPokemon(validPokemon);
      }

      setOffset(newOffset + LIMIT);
      setHasMore(data.next !== null);
    } catch (err) {
      console.error("Error fetching pokemon:", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMore = async () => {
    if (selectedType !== "all") {
      setLoadingMore(true);

      try {
        const { data } = await axios.get(`${API_BASE}/type/${selectedType}`);

        const pokemonUrls = data.pokemon
          .slice(offset, offset + LIMIT)
          .map((p: { pokemon: { url: string } }) => p.pokemon.url);
        const details = await Promise.all(pokemonUrls.map(fetchPokemonDetails));

        setPokemon((prev) => [
          ...prev,
          ...(details.filter(Boolean) as Pokemon[]),
        ]);

        setOffset((prev) => prev + LIMIT);
        setHasMore(data.pokemon.length > offset + LIMIT);
      } catch (err) {
        console.error("Error loading more:", err);
      } finally {
        setLoadingMore(false);
      }
    } else {
      await fetchAll(offset, true);
    }
  };

  useEffect(() => {
    setPokemon([]);
    setOffset(0);
    if (selectedType === "all") {
      fetchAll(0);
    } else {
      fetchByType(selectedType);
    }
  }, [selectedType]);

  return { pokemon, loading, loadingMore, loadMore, hasMore };
};

export const usePokemonDetails = (id: string | undefined) => {
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [abilities, setAbilities] = useState<AbilityDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchDetails = async () => {
      setLoading(true);

      try {
        const { data } = await axios.get<PokemonDetails>(
          `${API_BASE}/pokemon/${id}`,
        );
        setPokemon(data);

        const abilityDetails = await Promise.all(
          data.abilities.map(async (a) => {
            const abilityRes = await axios.get(a.ability.url);
            const abilityData = abilityRes.data;

            const englishEffect = abilityData.effect_entries.find(
              (e: { language: { name: string } }) => e.language.name === "en",
            );
            return {
              name: a.ability.name,
              effect:
                englishEffect?.short_effect ||
                englishEffect?.effect ||
                "No effect available",
            };
          }),
        );
        setAbilities(abilityDetails);
      } catch (err) {
        console.error("Error fetching pokemon details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  return { pokemon, abilities, loading };
};
