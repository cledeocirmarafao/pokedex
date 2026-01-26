import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchInput = ({ value, onChange }: SearchInputProps) => {
  return (
    <div className="relative group">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search Pokémon..."
        className="font-semibold appearance-none px-6 py-3 pl-12 rounded-xl text-sm tracking-wider transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[hsl(var(--color-neon-cyan))] hover:shadow-[0_0_30px_hsl(var(--color-neon-magenta)/0.4)] bg-linear-to-r from-[hsl(var(--color-neon-magenta)/0.25)] to-[hsl(var(--color-neon-cyan)/0.15)] text-foreground w-full sm:w-64 md:w-80 placeholder:font-['Exo 2']"
      />
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none text-muted-foreground" />
    </div>
  );
};
