import { TYPE_COLORS } from "../../constants/pokemonTypes";

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
