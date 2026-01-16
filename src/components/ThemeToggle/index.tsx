import { Moon, Sun } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

export const ThemeToggle = () => {
    const { theme, toggleTheme} = useTheme()

    return (
        <button onClick={toggleTheme} aria-label="Toggle theme" className="glass-card p-3 rounded-full transition-all duration-300 hover:scale-110 hover:bg-[hsl(var(--color-neon-glow))] group">
            {theme === 'dark' ? (
                <Sun className="w-6 h-6 text-[hsl(var(--color-neon-purple))] transition-transform duration-300 group-hover:rotate-180"/>
            ) : (
                <Moon className="w-6 h-6 text-[hsl(var(--color-neon-purple))] transition-transform duration-300 group-hover:rotate-12"/>
            )}

        </button>
    )
}

