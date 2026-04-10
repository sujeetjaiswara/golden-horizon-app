import { useState, useEffect } from 'react';
import { getNextGoldenHourEvent } from '@/lib/sun-calculations';
import type { GoldenHourEvent } from '@/lib/types';

export function useGoldenHour(lat: number, lng: number) {
  const [event, setEvent] = useState<GoldenHourEvent | null>(null);

  useEffect(() => {
    function update() {
      setEvent(getNextGoldenHourEvent(new Date(), lat, lng));
    }

    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, [lat, lng]);

  return event;
}
