export function GradientBackground() {
  return (
    <div
      className="animate-gradient-shift pointer-events-none fixed inset-0 -z-10 opacity-30"
      style={{
        background: 'linear-gradient(135deg, oklch(0.85 0.12 80), oklch(0.78 0.16 60), oklch(0.72 0.18 45), oklch(0.85 0.12 80))',
        backgroundSize: '200% 200%',
      }}
    />
  );
}
