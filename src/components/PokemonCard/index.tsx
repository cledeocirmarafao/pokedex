import { Link } from "react-router-dom";

interface PokemonCardProps {
  id: number;
  name: string;
  image: string;
  delay?: number;
}

export const PokemonCard = ({
  id,
  name,
  image,
  delay = 0,
}: PokemonCardProps) => {
  return (
    <Link
      to={`/pokemon/${id}`}
      className="group glass-card p-6 cursor-pointer hover:scale-105 hover:shadow-[0_0_20px_hsl(var(--color-neon-cyan)/0.3),0_0_40px_hsl(var(--color-neon-magenta)/0.2)] transition-all animate-fade-scale opacity-0"
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: "forwards",
      }}
    >
      <div className="mb-5">
        <div
          className="translate-y-[-10%] absolute inset-0 opacity-20 blur-2xl group-hover:opacity-30 transition-opacity rounded-full"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--color-neon-cyan)) 30%, hsl(var(--color-neon-purple)) 40%, transparent 0%)",
          }}
        />
        <img
          src={image}
          alt={name}
          className="w-full h-45 object-contain relative z-10 hover:scale-110 transition-transform animate-float"
          loading="lazy"
        />
      </div>

      <div className="text-center space-y-1">
        <span className="text-[hsl(var(--color-muted-foreground))] text-sm font-mono">
          #{String(id).padStart(3, "0")}
        </span>
        <h3 className="text-lg font-bold capitalize text-gradient-primary group-hover:neon-text transition-all">
          {name}
        </h3>
      </div>
    </Link>
  );
};
