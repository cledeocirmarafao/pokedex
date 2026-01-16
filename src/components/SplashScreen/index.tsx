import { useState, useEffect } from "react";
import { cn } from "../lib/utils";

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500), //pokebola aparece
      setTimeout(() => setPhase(2), 1500), //pokebola abre
      setTimeout(() => setPhase(3), 2500), // Logo aparece
      setTimeout(() => setPhase(4), 3000), //sublogo aparece
      setTimeout(() => setPhase(5), 4000), // tudo desaparece
      setTimeout(() => onComplete(), 4500), //completado
    ];

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [onComplete]);

  return (
    <section
      className={`fixed inset-0 z-100 flex items-center justify-center pokemon-gradient-bg transition-opacity duration-500 ${
        phase >= 5 ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* background de particulas animadas */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full animate-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `hsl(${185 + Math.random() * 135} 100% 60%)`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* anel de rotação */}
      <div
        className={`absolute w-80 h-80 rounded-full border-4 border-dashed transition-all duration-1000 ${
          phase >= 1
            ? "opacity-30 scale-100 animate-spin-slow"
            : "opacity-0 scale-50"
        }`}
        style={{ borderColor: "hsl(var(--color-neon-cyan))" }}
      />

      <div
        className={`absolute w-96 h-96 rounded-full border-4 border-dashed transition-all duration-1000 delay-200 ${
          phase >= 1
            ? "opacity-20 scale-100 animate-spin-reverse"
            : "opacity-0 scale-50"
        }`}
        style={{ borderColor: "hsl(var(--color-neon-magenta))" }}
      />

      {/* pokebola */}
      <div
        className={`relative transition-all duration-700 ${
          phase >= 1 ? "scale-100 opacity-100" : "scale-0 opacity-0"
        } ${phase >= 2 ? "animate-pokeball-shake" : ""}`}
      >
        {/* pokebola container */}
        <div className="relative w-40 h-40">
          {/* parte de cima */}
          <div
            className={`absolute top-0 left-0 right-0 h-1/2 -ml-1 rounded-t-full overflow-hidden transition-all duration-500 ${
              phase >= 2 ? "-translate-y-4 rotate-[-10deg]" : ""
            }`}
          >
            <div className="w-full h-full bg-linear-to-b from-red-500 to-red-600 relative">
              <div className="absolute inset-x-0 top-2 h-4 bg-red-400/50 rounded-full mx-4 blur-sm" />
            </div>
          </div>

          {/* parte de baixo */}
          <div
            className={`absolute bottom-0 left-0 right-0 h-1/2 -ml-1 rounded-b-full overflow-hidden transition-all duration-500 ${
              phase >= 2 ? "translate-y-4 rotate-10" : ""
            }`}
          >
            <div className="w-full h-full bg-linear-to-b from-gray-100 to-gray-200" />
          </div>

          {/* parte do meio */}
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gray-800 z-10 transition-opacity duration-300 ${
              phase >= 2 ? "opacity-0" : "opacity-100"
            }`}
          />

          {/* botão do meio */}
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gray-800 z-20 flex items-center justify-center transition-all duration-500 ${
              phase >= 2 ? "scale-150 animate-grow-pulse" : ""
            }`}
          >
            <div
              className={cn(
                "w-8 h-8 rounded-full transition-all duration-500",
                phase >= 2
                  ? "bg-linear-to-br from-[hsl(var(--color-neon-cyan))] to-[hsl(var(--color-neon-magenta))] shadow-[0_0_30px_hsl(var(--color-neon-cyan)),0_0_60px_hsl(var(--color-neon-magenta))]"
                  : "bg-gray-100"
              )}
            />

            {/* explosão de energia ao abrir */}
            {phase >= 2 && (
              <div className="absolute">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-16 animate-energy-burst"
                    style={{
                      background: `linear-gradient(transparent, hsl(${
                        185 + i * 20
                      } 100% 60%))`,
                      transform: `rotate(${i * 45}deg)`,
                      transformOrigin: "top center",
                      animationDelay: `${i * 0.05}s`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Logo de abertura */}
      <div
        className={`absolute transition-all duration-700 ${
          phase >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        style={{ marginTop: "350px" }}
      >
        <h1 className="font-display text-5xl md:text-7xl font-bold text-gradient-neon animate-text-glow">
          PokéDex
        </h1>
        <p
          className={cn(
            "text-center text-2xl text-muted-foreground mt-4 transition-all duration-500 delay-300",
            phase >= 4 ? "opacity-100" : "opacity-0"
          )}
        >
          Gotta Catch 'Em All
        </p>
      </div>

        {/* barra de carregamento fictícia*/}
      <div className="absolute bottom-40 left-1/2 -translate-x-1/2 w-64">
        <div className="h-1 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full transition-all duration-4000 ease-out" 
            style={{ 
              width: phase >= 1 ? '100%' : '0%',
              background: 'linear-gradient(135deg, hsl(var(--color-neon-cyan)), hsl(var(--color-neon-magenta)))'
            }}
          />
        </div>
        <p className={`text-center text-muted-foreground text-3xl mt-3 transition-opacity duration-300 ${phase >= 1 && phase < 5 ? 'opacity-100' : 'opacity-0'}`}>
          Loading...
        </p>
      </div>
    </section>
  );
};
