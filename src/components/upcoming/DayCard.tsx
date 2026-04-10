import { Card, CardContent } from '@/components/ui/card';
import { formatTime, formatDayDate } from '@/lib/format-time';
import { Sunrise, Sunset } from 'lucide-react';
import type { DaySunData } from '@/lib/types';

export function DayCard({ data, isToday }: { data: DaySunData; isToday: boolean }) {
  if (data.isPolar) {
    return (
      <Card className={isToday ? 'border-amber/40' : ''}>
        <CardContent className="py-3">
          <p className="text-sm font-medium">{formatDayDate(data.date)}</p>
          <p className="text-xs text-muted-foreground">
            {data.polarType === 'midnight-sun' ? 'Midnight Sun' : 'Polar Night'}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`transition-transform hover:scale-[1.02] ${isToday ? 'border-amber/40' : ''}`}>
      <CardContent className="py-3">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm font-semibold">
            {formatDayDate(data.date)}
            {isToday && <span className="ml-2 text-xs text-amber">(Today)</span>}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Sunrise className="h-3 w-3" />
              <span>Rise {formatTime(data.sunrise)}</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Sunset className="h-3 w-3" />
              <span>Set {formatTime(data.sunset)}</span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-amber" />
              <span className="text-muted-foreground">
                {formatTime(data.goldenHourMorningStart)} – {formatTime(data.goldenHourMorningEnd)}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-sunset" />
              <span className="text-muted-foreground">
                {formatTime(data.goldenHourEveningStart)} – {formatTime(data.goldenHourEveningEnd)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
