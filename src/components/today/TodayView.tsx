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
      <div className="flex flex-col gap-4 lg:gap-6">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-amber">Today</p>
          <h2 className="mt-0.5 text-lg font-semibold tracking-tight">{formatDate(today)}</h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
          <CountdownSection lat={lat} lng={lng} />
          <SunPositionArc data={sunData} lat={lat} lng={lng} />
          <SunTimesCard data={sunData} />
          <GoldenHourCard data={sunData} />
        </div>
      </div>
    </PageTransition>
  );
}
