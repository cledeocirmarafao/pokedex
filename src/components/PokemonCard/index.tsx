import { Link } from "react-router-dom";

interface PokemonCardProps {
    id: number
    name: string
    image: string
    delay?: number
}

export const PokemonCard = ({id, name, image, delay = 0}: PokemonCardProps) => {
    return (
        <Link to={`/pokemon/${id}`} className="glass-card p-6 cursor-pointer hover:scale-105 transition-all animate-fade-scale opacity-0" style={{
            animationDelay: `${delay}ms`,
            animationFillMode: 'forwards'
        }}>
            <div className="relative mb-4">
                <div className="absolute inset-0 opacity-20 blur-2xl group-hover:opacity-40 transition-opacity rounded-full" style={{background: 'hsl(var(--color-neon))'}} />
                <img src={image} alt={name} className="w-full h-40 object-contain relative z-10 group-hover:scale-110 transition-transform animate-float" loading="lazy"/>
            </div>

            <div className="text-center space-y-1">
                <span className="text-muted-foreground text-sm font-mono">
                    #{String(id).padStart(3, '0')}
                </span>
                <h3 className="font-display text-lg font-bold capitalize text-gradient-primary group-hover:neon-text transition-all">
                    {name}
                </h3>
            </div>
        
        </Link>
    )
}