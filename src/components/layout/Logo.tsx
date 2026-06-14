interface LogoProps {
  className?: string;
}

/**
 * Golden Horizon brand mark — a sun rising over a horizon line,
 * drawn in the warm amber→sunset brand gradient. Inline SVG so it
 * stays crisp at any size and needs no asset file.
 */
export function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      role="img"
      aria-label="Golden Horizon"
    >
      <defs>
        <linearGradient id="ghLogoBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.75 0.18 55)" />
          <stop offset="100%" stopColor="oklch(0.65 0.22 35)" />
        </linearGradient>
      </defs>

      {/* gradient disc */}
      <rect x="0" y="0" width="32" height="32" rx="16" fill="url(#ghLogoBg)" />

      {/* sun rays */}
      <g
        stroke="oklch(0.99 0.02 90)"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.95"
      >
        <line x1="16" y1="5" x2="16" y2="8.5" />
        <line x1="7.5" y1="8" x2="9.8" y2="10.3" />
        <line x1="24.5" y1="8" x2="22.2" y2="10.3" />
        <line x1="5" y1="16" x2="8" y2="16" />
        <line x1="27" y1="16" x2="24" y2="16" />
      </g>

      {/* sun disc */}
      <circle cx="16" cy="16" r="4.6" fill="oklch(0.99 0.02 90)" />

      {/* horizon line */}
      <line
        x1="6"
        y1="22.5"
        x2="26"
        y2="22.5"
        stroke="oklch(0.99 0.02 90)"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.9"
      />
    </svg>
  );
}
