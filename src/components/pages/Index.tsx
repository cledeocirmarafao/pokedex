import { useState, useMemo } from "react";
import { LoadingSpinner } from "../LoadingSpinner";
import { PokemonCard } from "../PokemonCard";
import { SearchInput } from "../SearchInput";
import { SplashScreen } from "../SplashScreen";
import { ThemeToggle } from "../ThemeToggle";
import { TypeFilter } from "../TypeFilter";
import { usePokemonList } from "../hooks/usePokemon";
import { Sparkles, Info } from "lucide-react";

export const Index = () => {
  const [selectedType, setSelectedType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSplash, setShowSplash] = useState(() => {
    return !sessionStorage.getItem("pokemon-splash-shown");
  });
  const { pokemon, loading, loadingMore, loadMore, hasMore } =
    usePokemonList(selectedType);

  const filteredPokemon = useMemo(() => {
    if (!searchQuery.trim()) return pokemon;
    return pokemon.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [pokemon, searchQuery]);

  const handleSplashComlete = () => {
    setShowSplash(false);
    sessionStorage.setItem("pokemon-splash-shown", "true");
  };

  const isSearching = searchQuery.trim().length > 0;
  const noResults = isSearching && filteredPokemon.length === 0;

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComlete} />}

      <section className="min-h-screen pokemon-gradient-bg py-5 px-4">
        <header className="sticky top-0 z-50 border border-[hsl(var(--color-border))] rounded-lg backdrop-blur-lg shadow-[0_15px_30px_hsl(var(--color-neon-purple)/0.1)]">
          <div className="container mx-auto p-4 flex items-center justify-between">
            <div className="flex items-center gap-3 animate-hero-entrance">
              <div className="w-12 h-12 rounded-full bg-gradient-neon flex items-center justify-center neon-glow">
                <Sparkles className="w-6 h-6  text-white shadow-neon-glow" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gradient-neon">
                Pokédex
              </h3>
            </div>
            <ThemeToggle />
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div
            className="text-center mb-12 animate-slide-up opacity-0"
            style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 neon-text">
              Gotta Catch 'Em All
            </h1>
            <p className="text-[hsl(var(--color-muted-foreground))] text-lg font-semibold max-w-2xl mx-auto">
              Explore the world of Pokémon. Click on any Pokémon to discover
              their moves, abilities, and more.
            </p>
          </div>

          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 animate-slide-up opacity-0"
            style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
          >
            <TypeFilter
              selectedType={selectedType}
              onTypeChange={setSelectedType}
            />
            <SearchInput value={searchQuery} onChange={setSearchQuery} />
          </div>

          {isSearching && (
            <div className="glass-card p-4 mb-6 flex items-start gap-3 border-l-4 border-[hsl(var(--color-neon-cyan))]">
              <Info className="w-5 h-5 text-[hsl(var(--color-neon-cyan))] shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-foreground">
                  {noResults ? (
                    <>
                      <span className="font-semibold">
                        No Pokémon found in loaded results.
                      </span>
                      <span className="text-muted-foreground">
                        {" "}
                        Try loading more Pokémon to expand your search!
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="font-semibold">
                        Showing {filteredPokemon.length} result
                        {filteredPokemon.length !== 1 ? "s" : ""}
                      </span>
                      <span className="text-muted-foreground">
                        {" "}
                        from {pokemon.length} loaded Pokémon. Load more to
                        search through additional Pokémon.
                      </span>
                    </>
                  )}
                </p>
              </div>
            </div>
          )}

          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              {noResults ? (
                <div className="text-center py-16">
                  <div className="glass-card  p-8 rounded-2xl neon-magenta">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-neon opacity-20 flex items-center justify-center">
                      <Sparkles className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-[hsl(var(--color-foreground))] mb-2">
                      No Pokémon Found
                    </h3>
                    <p className="text-[hsl(var(--color-muted-foreground))] mb-6">
                      Try loading more Pokémon or adjusting your search
                    </p>
                    {hasMore && (
                      <button
                        onClick={loadMore}
                        disabled={loadingMore}
                        className="glass-card neon-glow px-6 py-3 rounded-xl font-display text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:neon-glow disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-purple text-white font-semibold"
                      >
                        Load More Pokémon
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                  {filteredPokemon.map((p, i) => (
                    <PokemonCard
                      key={p.id}
                      id={p.id}
                      name={p.name}
                      image={p.image}
                      delay={i * 50}
                    />
                  ))}
                </div>
              )}

              {!noResults && hasMore && (
                <div className="flex justify-center mt-12">
                  <button
                    onClick={loadMore}
                    disabled={loadingMore}
                    className="glass-card px-8 py-4 rounded-xl text-lg uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_hsl(var(--color-neon-cyan)/0.2)] disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-purple text-white font-semibold"
                  >
                    {loadingMore ? (
                      <span className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Loading...
                      </span>
                    ) : (
                      "Load More"
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </main>

        <footer className="glass-card mt-16 py-6 text-center text-muted-foreground">
          <p className="font-display text-sm">
            Powered by{" "}
            <a
              href="https://pokeapi.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[hsl(var(--color-neon-cyan))] hover:underline"
            >
              PokéAPI
            </a>
          </p>
        </footer>
      </section>
    </>
  );
};
