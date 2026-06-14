import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatTime, formatDayDate } from '@/lib/format-time';
import { Sunrise, Sunset } from 'lucide-react';
import type { DaySunData } from '@/lib/types';

export function DayCard({ data, isToday }: { data: DaySunData; isToday: boolean }) {
  const cardClass = `card-premium h-full py-4 ${
    isToday ? 'bg-amber/[0.04] ring-1 ring-amber/40' : ''
  }`;

  if (data.isPolar) {
    return (
      <Card className={cardClass}>
        <CardContent className="py-0">
          <p className="text-sm font-semibold">{formatDayDate(data.date)}</p>
          <p className="text-xs text-muted-foreground">
            {data.polarType === 'midnight-sun' ? 'Midnight Sun' : 'Polar Night'}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cardClass}>
      <CardContent className="py-0">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-semibold tracking-tight">{formatDayDate(data.date)}</p>
          {isToday && (
            <Badge variant="secondary" className="border-amber/30 text-amber">
              Today
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Sunrise className="h-3.5 w-3.5 text-amber" aria-hidden />
              <span>
                Rise <span className="font-medium tabular-nums text-foreground">{formatTime(data.sunrise)}</span>
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Sunset className="h-3.5 w-3.5 text-sunset" aria-hidden />
              <span>
                Set <span className="font-medium tabular-nums text-foreground">{formatTime(data.sunset)}</span>
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-amber" />
                <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                  Morning
                </span>
              </div>
              <p className="ml-3.5 font-medium tabular-nums text-foreground">
                {formatTime(data.goldenHourMorningStart)} – {formatTime(data.goldenHourMorningEnd)}
              </p>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-sunset" />
                <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                  Evening
                </span>
              </div>
              <p className="ml-3.5 font-medium tabular-nums text-foreground">
                {formatTime(data.goldenHourEveningStart)} – {formatTime(data.goldenHourEveningEnd)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
