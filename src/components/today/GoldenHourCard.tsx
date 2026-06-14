import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Sun } from 'lucide-react';
import { formatTime } from '@/lib/format-time';
import type { DaySunData } from '@/lib/types';

export function GoldenHourCard({ data }: { data: DaySunData }) {
  if (data.isPolar) return null;

  return (
    <Card className="card-premium h-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <Sun className="h-4 w-4 text-gold" aria-hidden />
          Golden Hour Windows
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Morning</p>
            <p className="text-sm font-semibold tabular-nums">
              {formatTime(data.goldenHourMorningStart)} — {formatTime(data.goldenHourMorningEnd)}
            </p>
          </div>
          <div className="h-2.5 w-2.5 rounded-full bg-amber ring-2 ring-amber/20" />
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Evening</p>
            <p className="text-sm font-semibold tabular-nums">
              {formatTime(data.goldenHourEveningStart)} — {formatTime(data.goldenHourEveningEnd)}
            </p>
          </div>
          <div className="h-2.5 w-2.5 rounded-full bg-sunset ring-2 ring-sunset/20" />
        </div>
      </CardContent>
    </Card>
  );
}
