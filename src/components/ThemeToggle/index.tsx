import { Moon, Sun } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={`glass-card p-2 rounded-full transition-all duration-300 hover:scale-110 neon-glow cursor-pointer group ${theme === "dark" ? "hover:bg-black" : ""}`}
    >
      {theme === "dark" ? (
        <Sun className="w-6 h-6 text-[hsl(var(--color-neon-yellow))] transition-transform duration-300 group-hover:rotate-240" />
      ) : (
        <Moon className="w-6 h-6 text-[hsl(var(--color-neon-purple))] transition-transform duration-300 group-hover:rotate-20" />
      )}
    </button>
  );
};
