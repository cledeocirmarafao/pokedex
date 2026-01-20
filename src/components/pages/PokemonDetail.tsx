import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Zap, Shield, Move } from "lucide-react";
import { usePokemonDetails } from "../hooks/usePokemon";
import { ThemeToggle } from "../ThemeToggle";
import { TypeBadge } from "../TypeBadge";
import { LoadingSpinner } from "../LoadingSpinner";

export const PokemonDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { pokemon, abilities, loading } = usePokemonDetails(id);

  if (loading) {
    return (
      <div className="min-h-screen pokemon-gradient-bg flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="min-h-screen pokemon-gradient-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl text-foreground mb-4">
            Pokemon not found
          </h1>
          <Link
            to="/"
            className="text-[hsl(var(--color-neon-cyan))] hover:underline"
          >
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  const image =
    pokemon.sprites.other["official-artwork"].front_default ||
    pokemon.sprites.front_default;

  return (
    <section className="min-h-screen pokemon-gradient-bg">
      <header className="sticky top-0 z-50 glass-card border-b border-border/50 backdrop-blur-xl">
        <div className="container mx-auto p-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-[hsl(var(--color-muted-foreground))] hover:text-[hsl(var(--color-neon-cyan))] hover:underline transition-colors font-display"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className=" container mx-auto px-4 py-8">
        <section className="glass-card neon-glow p-8 mb-8 animate-hero-entrance">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="relative shrink-0">
              <div className="absolute inset-0 bg-gradient-neon opacity-30 blur-3xl rounded-full" />
              <img
                src={image}
                alt={pokemon.name}
                className="w-64 h-64 md:w-80 object-contain relative z-10 animate-float-slow"
              />
            </div>

            <div className="flex-1 text-center lg:text-left">
              <span className="text-[hsl(var(--color-muted-foreground))] font-mono text-xl">
                #{String(pokemon.id).padStart(3, "0")}
              </span>
              <h1 className="text-5xl md:text-6xl font-bold capitalize mt-2 mb-6 text-gradient-neon">
                {pokemon.name}
              </h1>

              <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-6">
                {pokemon.types.map((t) => (
                  <TypeBadge key={t.type.name} type={t.type.name} size="lg" />
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0 font-['Orbitron']">
                <div className="glass-card p-4 rounded-xl text-center neon-magenta">
                  <span className="text-[hsl(var(--color-muted-foreground))] text-sm">
                    Height
                  </span>
                  <p className=" text-2xl font-bold text-foreground">
                    {pokemon.height / 10}m
                  </p>
                </div>
                <div className="glass-card p-4 rounded-xl text-center neon-magenta">
                  <span className="text-[hsl(var(--color-muted-foreground))] text-sm">
                    Weight
                  </span>
                  <p className="font-display text-2xl font-bold txt-foreground">
                    {pokemon.weight / 10}kg
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid lg:grid-cols-2 gap-8">
          <div
            className="glass-card p-6 animate-slide-up opacity-0 neon-magenta"
            style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-purple flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[hsl(var(--color-foreground))]">
                Abilities
              </h2>
            </div>
            <div className="space-y-4">
              {abilities.map((a) => (
                <div
                  key={a.name}
                  className="glass-card p-4 rounded-xl neon-border"
                >
                  <h3 className="text-lg font-semibold capitalize mb-2 text-[hsl(var(--color-neon-cyan))]">
                    {a.name.replace("-", " ")}
                  </h3>
                  <p className="text-[hsl(var(--color-muted-foreground))] text-sm leading-relaxed">
                    {a.effect}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div
            className="glass-card p-6 animate-slide-up opacity-0 neon-magenta"
            style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-neon flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h2 className="font-display text-2xl font-bold text-[hsl(var(--color-foreground))]"></h2>
              <span className="text-[hsl(var(--color-muted-foreground))] text-sm">
                ({pokemon.moves.length} total)
              </span>
            </div>
            <div className="max-h-96 overflow-y-auto pr-2 space-y-2">
              <div className="flex flex-wrap gap-2">
                {pokemon.moves.slice(0, 50).map((m) => (
                  <span
                    key={m.move.name}
                    className="glass-card px-3 py-1.5 rounded-full text-sm capitalize text-foreground neon-magenta transition-all duration-200 cursor-default hover:shadow-[0_0_20px_hsl(var(--color-neon-cyan)/0.3),0_0_40px_hsl(var(--color-neon-magenta)/0.2)]"
                  >
                    {m.move.name.replace("-", " ")}
                  </span>
                ))}
                {pokemon.moves.length > 50 && (
                  <span className="px-3 py-1.5 text-sm text-[hsl(var(--color-muted-foreground))]">
                    +{pokemon.moves.length - 50} more
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        <section
          className="glass-card p-6 mt-8 animate-slide-up opacity-0 neon-glow"
          style={{ animationDelay: "600ms", animationFillMode: "forwards" }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-neon flex items-center justify-center">
              <Move className="w-5 h-5 text-white" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground">
              Base Stats
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pokemon.stats.map((s) => (
              <div
                key={s.stat.name}
                className="glass-card p-4 rounded-xl text-[hsl(var(--color-muted-foreground))]"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-muted-foreground text-sm capitalize">
                    {s.stat.name.replace("-", " ")}
                  </span>
                  <span className="font-display font-bold text-[hsl(var(--color-neon-cyan))]">
                    {s.base_stat}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-neon transition-all duration-500"
                    style={{
                      width: `${Math.min(100, (s.base_stat / 255) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </section>
  );
};
