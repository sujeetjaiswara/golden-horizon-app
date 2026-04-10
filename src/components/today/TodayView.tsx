import { useLocation } from '@/context/LocationContext';
import { useSunCalc } from '@/hooks/useSunCalc';
import { PageTransition } from '@/components/layout/PageTransition';
import { SunTimesCard } from './SunTimesCard';
import { GoldenHourCard } from './GoldenHourCard';
import { CountdownSection } from './CountdownSection';
import { SunPositionArc } from './SunPositionArc';
import { formatDate } from '@/lib/format-time';

export function TodayView() {
  const { lat, lng } = useLocation();
  const today = new Date();
  const sunData = useSunCalc(today, lat, lng);

  return (
    <PageTransition>
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-sm font-medium text-muted-foreground">{formatDate(today)}</h2>
        </div>

        <CountdownSection lat={lat} lng={lng} />
        <SunPositionArc data={sunData} lat={lat} lng={lng} />
        <SunTimesCard data={sunData} />
        <GoldenHourCard data={sunData} />
      </div>
    </PageTransition>
  );
}
