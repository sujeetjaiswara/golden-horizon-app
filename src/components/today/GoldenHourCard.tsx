import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Sun } from 'lucide-react';
import { formatTime } from '@/lib/format-time';
import type { DaySunData } from '@/lib/types';

export function GoldenHourCard({ data }: { data: DaySunData }) {
  if (data.isPolar) return null;

  return (
    <Card className="transition-transform hover:scale-[1.02]">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <Sun className="h-4 w-4 text-gold" />
          Golden Hour Windows
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Morning</p>
            <p className="text-sm font-semibold">
              {formatTime(data.goldenHourMorningStart)} — {formatTime(data.goldenHourMorningEnd)}
            </p>
          </div>
          <div className="h-2 w-2 rounded-full bg-amber" />
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Evening</p>
            <p className="text-sm font-semibold">
              {formatTime(data.goldenHourEveningStart)} — {formatTime(data.goldenHourEveningEnd)}
            </p>
          </div>
          <div className="h-2 w-2 rounded-full bg-sunset" />
        </div>
      </CardContent>
    </Card>
  );
}
