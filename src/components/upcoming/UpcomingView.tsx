import { useMemo } from 'react';
import { useLocation } from '@/context/LocationContext';
import { getWeekSunData } from '@/lib/sun-calculations';
import { PageTransition } from '@/components/layout/PageTransition';
import { DayCard } from './DayCard';
import { motion } from 'framer-motion';

export function UpcomingView() {
  const { lat, lng } = useLocation();
  const weekData = useMemo(() => getWeekSunData(new Date(), lat, lng), [lat, lng]);

  return (
    <PageTransition>
      <div className="flex flex-col gap-4 lg:gap-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-amber">Upcoming</p>
          <h2 className="mt-0.5 text-lg font-semibold tracking-tight">7-Day Golden Hour Preview</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {weekData.map((day, i) => (
            <motion.div
              key={day.date.toISOString()}
              className="h-full"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.2 }}
            >
              <DayCard data={day} isToday={i === 0} />
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
