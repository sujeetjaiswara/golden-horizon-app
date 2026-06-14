import { Card, CardContent } from '@/components/ui/card';
import { Sunrise, Sunset } from 'lucide-react';
import { formatTime } from '@/lib/format-time';
import type { DaySunData } from '@/lib/types';

export function SunTimesCard({ data }: { data: DaySunData }) {
  if (data.isPolar) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-6">
          <p className="text-sm text-muted-foreground">
            {data.polarType === 'midnight-sun' ? '☀️ Midnight Sun — No sunset today' : '🌑 Polar Night — No sunrise today'}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-premium h-full">
      <CardContent className="grid h-full grid-cols-2 items-center gap-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber/10 ring-1 ring-amber/15">
            <Sunrise className="h-5 w-5 text-amber" aria-hidden />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Sunrise</p>
            <p className="text-xl font-semibold tabular-nums">{formatTime(data.sunrise)}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sunset/10 ring-1 ring-sunset/15">
            <Sunset className="h-5 w-5 text-sunset" aria-hidden />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Sunset</p>
            <p className="text-xl font-semibold tabular-nums">{formatTime(data.sunset)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
