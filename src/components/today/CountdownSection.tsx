import { Card, CardContent } from '@/components/ui/card';
import { Sunrise, Sunset } from 'lucide-react';
import { CountdownTimer } from '@/components/shared/CountdownTimer';
import { GoldenHourBadge } from '@/components/shared/GoldenHourBadge';
import { useGoldenHour } from '@/hooks/useGoldenHour';
import { useCountdown } from '@/hooks/useCountdown';

interface CountdownSectionProps {
  lat: number;
  lng: number;
}

export function CountdownSection({ lat, lng }: CountdownSectionProps) {
  const event = useGoldenHour(lat, lng);
  const countdown = useCountdown(event && !event.isActive ? event.window.start : null);

  if (!event) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <p className="text-sm text-muted-foreground">No golden hour data available</p>
        </CardContent>
      </Card>
    );
  }

  const label = event.window.type === 'morning' ? 'Morning' : 'Evening';
  const Icon = event.window.type === 'morning' ? Sunrise : Sunset;

  return (
    <Card
      className={`h-full bg-gradient-to-b from-card to-accent/10 ${
        event.isActive ? 'animate-glow-pulse border-amber/40' : ''
      }`}
    >
      <CardContent className="flex h-full flex-col items-center justify-center gap-4 py-6">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-amber" aria-hidden />
          <span className="text-sm font-medium text-muted-foreground">
            {event.isActive ? `${label} Golden Hour` : `Next: ${label} Golden Hour`}
          </span>
          <GoldenHourBadge isActive={event.isActive} startsInMs={event.startsIn} />
        </div>

        {event.isActive ? (
          <div className="text-center">
            <p className="text-2xl font-bold text-amber">
              Golden hour is happening now!
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Grab your camera and catch the magic
            </p>
          </div>
        ) : (
          <CountdownTimer
            hours={countdown.hours}
            minutes={countdown.minutes}
            seconds={countdown.seconds}
            large
          />
        )}
      </CardContent>
    </Card>
  );
}
