import { ChevronDown } from "lucide-react";
import { TYPE_COLORS, POKEMON_TYPES } from "../../constants/pokemonTypes";

const TYPE_FILTER_COLOR: Record<string, string> = {
  all: "from-[hsl(var(--color-neon-cyan))] to-[hsl(var(--color-neon-magenta))]",
  ...TYPE_COLORS,
};

interface TypeFilterProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
}

export const TypeFilter = ({ selectedType, onTypeChange }: TypeFilterProps) => {
  return (
    <div className="relative group">
      <select
        value={selectedType}
        onChange={(e) => onTypeChange(e.target.value)}
        className={`glass-card appearance-none  px-6 py-3 pr-12 rounded-xl font-display text-sm uppercase tracking-wider cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--color-neon-cyan))] bg-linear-to-r ${TYPE_FILTER_COLOR[selectedType]} text-white font-semibold`}
      >
        {POKEMON_TYPES.map((type) => (
          <option
            key={type}
            value={type}
            className="bg-[hsl(var(--color-card))] text-[hsl(var(--color-foreground))]"
          >
            {type === "all" ? "All Types" : type}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none text-white" />
    </div>
  );
};
