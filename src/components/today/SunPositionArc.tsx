import { useMemo } from 'react';
import { getSunPosition } from '@/lib/sun-calculations';
import type { DaySunData } from '@/lib/types';

interface SunPositionArcProps {
  data: DaySunData;
  lat: number;
  lng: number;
}

export function SunPositionArc({ data, lat, lng }: SunPositionArcProps) {
  const position = useMemo(() => {
    const now = new Date();
    return getSunPosition(now, lat, lng);
  }, [lat, lng]);

  if (data.isPolar) return null;

  const sunriseTime = data.sunrise.getTime();
  const sunsetTime = data.sunset.getTime();
  const now = Date.now();

  const dayProgress = Math.max(0, Math.min(1, (now - sunriseTime) / (sunsetTime - sunriseTime)));
  const isDay = now >= sunriseTime && now <= sunsetTime;

  const width = 300;
  const height = 160;
  const cx = width / 2;
  const cy = height - 20;
  const rx = 130;
  const ry = 110;

  const angle = Math.PI - dayProgress * Math.PI;
  const sunX = cx + rx * Math.cos(angle);
  const sunY = cy - ry * Math.sin(angle);

  const altitudeDeg = (position.altitude * 180) / Math.PI;

  return (
    <div className="flex flex-col items-center">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-xs">
        <defs>
          <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="oklch(0.75 0.18 55)" stopOpacity="0.3" />
            <stop offset="50%" stopColor="oklch(0.78 0.16 75)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="oklch(0.65 0.22 35)" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* horizon line */}
        <line x1="10" y1={cy} x2={width - 10} y2={cy} stroke="currentColor" strokeOpacity="0.15" strokeWidth="1" />

        {/* arc path */}
        <ellipse
          cx={cx}
          cy={cy}
          rx={rx}
          ry={ry}
          fill="none"
          stroke="url(#arcGrad)"
          strokeWidth="2"
          strokeDasharray="4 4"
          clipPath="inset(0 0 50% 0)"
        />

        {/* golden hour zones */}
        <path
          d={describeArcSegment(cx, cy, rx, ry, 0, 0.15)}
          fill="oklch(0.75 0.18 55)" fillOpacity="0.1" stroke="none"
        />
        <path
          d={describeArcSegment(cx, cy, rx, ry, 0.85, 1)}
          fill="oklch(0.65 0.22 35)" fillOpacity="0.1" stroke="none"
        />

        {/* sun indicator */}
        {isDay && (
          <g>
            <circle cx={sunX} cy={sunY} r="14" fill="oklch(0.78 0.16 75)" fillOpacity="0.2" />
            <circle cx={sunX} cy={sunY} r="8" fill="oklch(0.85 0.14 80)" />
            <circle cx={sunX} cy={sunY} r="5" fill="oklch(0.78 0.16 75)" />
          </g>
        )}

        {/* labels */}
        <text x="15" y={cy + 14} fontSize="10" fill="currentColor" fillOpacity="0.4">
          Rise
        </text>
        <text x={width - 30} y={cy + 14} fontSize="10" fill="currentColor" fillOpacity="0.4">
          Set
        </text>
      </svg>
      <p className="text-xs text-muted-foreground">
        {isDay
          ? `Sun altitude: ${altitudeDeg.toFixed(1)}°`
          : 'Sun is below the horizon'}
      </p>
    </div>
  );
}

function describeArcSegment(
  cx: number, cy: number, rx: number, ry: number,
  startPct: number, endPct: number
): string {
  const startAngle = Math.PI - startPct * Math.PI;
  const endAngle = Math.PI - endPct * Math.PI;
  const x1 = cx + rx * Math.cos(startAngle);
  const y1 = cy - ry * Math.sin(startAngle);
  const x2 = cx + rx * Math.cos(endAngle);
  const y2 = cy - ry * Math.sin(endAngle);
  return `M ${x1} ${y1} A ${rx} ${ry} 0 0 1 ${x2} ${y2} L ${cx} ${cy} Z`;
}
