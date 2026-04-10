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
    <Card className="transition-transform hover:scale-[1.02]">
      <CardContent className="grid grid-cols-2 gap-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber/10">
            <Sunrise className="h-5 w-5 text-amber" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Sunrise</p>
            <p className="text-lg font-semibold">{formatTime(data.sunrise)}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sunset/10">
            <Sunset className="h-5 w-5 text-sunset" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Sunset</p>
            <p className="text-lg font-semibold">{formatTime(data.sunset)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
