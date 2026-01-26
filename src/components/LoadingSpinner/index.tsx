export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative w-20 h-20">
        <div
          className="absolute inset-0 rounded-full border-4 animate-spin"
          style={{
            borderTopColor: "hsl(var(--color-neon-cyan))",
            borderRightColor: "hsl(var(--color-neon-magenta))",
            borderBottomColor: "hsl(var(--color-neon-purple))",
            borderLeftColor: "hsl(var(--color-neon-yellow))",
            boxShadow: `
            0 0 20px hsl(var(--color-neon-cyan) / 0.4),
            0 0 40px hsl(var(--color-neon-magenta) / 0.3)
            `,
          }}
        />
        <div
          className="absolute inset-2 rounded-full opacity-50 animate-pulse"
          style={{
            background:
              "linear-gradient(135deg, hsl(var(--color-neon-cyan)), hsl(var(--color-neon-magenta)))",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-white shadow-lg animate-glow-pulse" />
        </div>
      </div>
    </div>
  );
};
