import { renderHook, waitFor, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import {
  usePokemonDetails,
  usePokemonList,
} from "../../components/hooks/usePokemon";

vi.mock("axios");
const mockedAxios = axios as any;

describe("usePokemonList Component", () => {
  const mockPokemonResponse = {
    data: {
      results: [
        { url: "https://pokeapi.co/v2/pokemon/1/" },
        { url: "https://pokeapi.co/v2/pokemon/2/" },
      ],
      next: "https://pokeapi.co/v2/pokemon?offset=10&limit=10",
    },
  };

  const mockPokemonDetails = {
    data: {
      id: 1,
      name: "bulbasaur",
      sprites: {
        front_default: "sprite.png",
        other: { "official-artwork": { front_default: "artwork.png" } },
      },
      types: [{ type: { name: "grass" } }],
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Search and return a list of Pokémon when assembling", async () => {
    mockedAxios.get
      .mockResolvedValueOnce(mockPokemonResponse)
      .mockResolvedValue(mockPokemonDetails);

    const { result } = renderHook(() => usePokemonList("all"));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.pokemon).toHaveLength(2);
    expect(result.current.pokemon[0]).toEqual({
      id: 1,
      name: "bulbasaur",
      image: "artwork.png",
      types: ["grass"],
    });
  });

  it("Filter by type when the option is not all", async () => {
    const mockTypeResponse = {
      data: {
        pokemon: [
          { pokemon: { url: "https://pokeapi.co/api/v2/pokemon/4/" } },
          { pokemon: { url: "https://pokeapi.co/api/v2/pokemon/5/" } },
        ],
      },
    };

    mockedAxios.get
      .mockResolvedValueOnce(mockTypeResponse)
      .mockResolvedValue(mockPokemonDetails);

    const { result } = renderHook(() => usePokemonList("fire"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/type/fire",
    );
    expect(result.current.pokemon).toHaveLength(2);
  });

  it("Show more Pokémon when LoadMore is called", async () => {
    mockedAxios.get
      .mockResolvedValueOnce(mockPokemonResponse)
      .mockResolvedValue(mockPokemonDetails);

    const { result } = renderHook(() => usePokemonList("all"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.pokemon).toHaveLength(2);

    mockedAxios.get
      .mockResolvedValueOnce({
        data: {
          results: [{ url: "https://pokeapi.co/api/v2/pokemon/3/" }],
          next: null,
        },
      })
      .mockResolvedValue({
        data: {
          id: 3,
          name: "venusaur",
          sprites: {
            front_default: "sprite3.png",
            other: { "official-artwork": { front_default: "artwork3.png" } },
          },
          types: [{ type: { name: "grass" } }],
        },
      });

    await act(async () => {
      result.current.loadMore();
    });

    await waitFor(() => {
      expect(result.current.loadingMore).toBe(false);
    });

    expect(result.current.pokemon.length).toBeGreaterThan(2);
    expect(result.current.pokemon).toHaveLength(3);
    expect(result.current.hasMore).toBe(false);
  });

  it("Error handling in Pokemon search", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    mockedAxios.get.mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => usePokemonList("all"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.pokemon).toHaveLength(0);
    expect(consoleError).toHaveBeenCalled();

    consoleError.mockRestore();
  });
});

describe("usePokemonDetails", () => {
  const mockDetailsResponse = {
    data: {
      id: 38,
      name: "ninetales",
      sprites: {
        front_default: "sprites.png",
        other: { "official-artwork": { front_default: "artwork.png" } },
      },
      types: [{ type: { name: "fire" } }],
      abilities: [
        {
          ability: {
            name: "static",
            url: "https://pokeapi.co/api/v2/ability/7/",
          },
          is_hidden: false,
        },
      ],
      moves: [
        {
          move: { name: "roar" },
        },
      ],
      height: 10,
      weight: 190,
      stats: [{ base_stats: 73, stat: { name: "hp" } }],
    },
  };

  const mockAbilityResponse = {
    data: {
      effect_entries: [
        {
          language: { name: "en" },
          short_effect: "Protects against fire moves",
          effect: "Full effect description",
        },
      ],
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Research all the details of the Pokémon", async () => {
    mockedAxios.get
      .mockResolvedValueOnce(mockDetailsResponse)
      .mockResolvedValue(mockAbilityResponse);

    const { result } = renderHook(() => usePokemonDetails("38"));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.pokemon).toEqual(mockDetailsResponse.data);
    expect(result.current.abilities).toHaveLength(1);
    expect(result.current.abilities[0]).toEqual({
      name: "static",
      effect: "Protects against fire moves",
    });
  });

  it("Uses full effect when short_effect is not available", async () => {
    const abilityWithoutShort = {
      data: {
        effect_entries: [
          { language: { name: "en" }, effect: "Full effect only" },
        ],
      },
    };

    mockedAxios.get
      .mockResolvedValueOnce(mockDetailsResponse)
      .mockResolvedValue(abilityWithoutShort);

    const { result } = renderHook(() => usePokemonDetails("38"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.abilities[0].effect).toBe("Full effect only");
  });

  it("The search is not performed when the ID is not defined", () => {
    renderHook(() => usePokemonDetails(undefined));

    expect(mockedAxios.get).not.toHaveBeenCalled();
  });

  it("Error handling in detail retrieval", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    mockedAxios.get.mockRejectedValue(new Error("Pokemon not Found"));

    const { result } = renderHook(() => usePokemonDetails("99999"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.pokemon).toBeNull();
    expect(consoleError).toHaveBeenCalled();

    consoleError.mockRestore();
  });
});
