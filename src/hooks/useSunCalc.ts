import { useMemo } from 'react';
import { getDaySunData } from '@/lib/sun-calculations';
import type { DaySunData } from '@/lib/types';

export function useSunCalc(date: Date, lat: number, lng: number): DaySunData {
  const dateKey = date.toDateString();
  // eslint-disable-next-line react-hooks/exhaustive-deps -- key on dateKey, not Date identity
  return useMemo(() => getDaySunData(date, lat, lng), [dateKey, lat, lng]);
}
