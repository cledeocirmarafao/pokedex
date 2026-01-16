const TYPE_COLORS: Record<string, string> = {
  normal: "from-gray-400 to-gray-500",
  fire: "from-orange-500 to-red-500",
  water: "from-blue-400 to-blue-600",
  electric: "from-yellow-400 to-yellow-500",
  grass: "from-green-400 to-green-600",
  ice: "from-cyan-300 to-cyan-500",
  fighting: "from-red-600 to-red-800",
  poison: "from-purple-500 to-purple-700",
  ground: "from-amber-600 to-amber-800",
  flying: "from-indigo-300 to-indigo-500",
  psychic: "from-pink-500 to-pink-600",
  bug: "from-lime-500 to-lime-600",
  rock: "from-stone-500 to-stone-700",
  ghost: "from-purple-700 to-purple-900",
  dragon: "from-indigo-600 to-purple-600",
  dark: "from-gray-700 to-gray-900",
  steel: "from-slate-400 to-slate-600",
  fairy: "from-pink-300 to-pink-500",
};

interface TypeBadgeProps {
  type: string;
  size?: "sm" | "md" | "lg";
}

export const TypeBadge = ({ type, size = "md" }: TypeBadgeProps) => {
  const sizeClasses = {
    sm: "px-2 py-0.5 text-sx",
    md: "px-4 py-1.5 text-sm",
    lg: "px-6 py-2 text-base",
  };

  return (
    <span
      className={`inline-block rounded-full bg-linear-to-r ${
        TYPE_COLORS[type] || TYPE_COLORS.normal
      } text-white font-display uppercase tracking-wider font-semibold shadow-lg ${
        sizeClasses[size]
      }`}
    >
      {type}
    </span>
  );
};
