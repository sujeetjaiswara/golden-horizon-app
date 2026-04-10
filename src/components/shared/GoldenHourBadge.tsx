import { Badge } from '@/components/ui/badge';

interface GoldenHourBadgeProps {
  isActive: boolean;
  startsInMs?: number;
}

export function GoldenHourBadge({ isActive, startsInMs }: GoldenHourBadgeProps) {
  if (isActive) {
    return (
      <Badge className="animate-glow-pulse bg-gradient-to-r from-amber to-gold text-white border-0">
        Active Now
      </Badge>
    );
  }

  if (startsInMs !== undefined && startsInMs > 0) {
    const minutes = Math.round(startsInMs / 60000);
    const label = minutes < 60 ? `In ${minutes} min` : `In ${Math.round(minutes / 60)}h`;
    return (
      <Badge variant="secondary" className="border-amber/30 text-amber">
        {label}
      </Badge>
    );
  }

  return null;
}
