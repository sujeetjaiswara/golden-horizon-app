import { useMemo } from 'react';
import { getDaySunData } from '@/lib/sun-calculations';
import type { DaySunData } from '@/lib/types';

export function useSunCalc(date: Date, lat: number, lng: number): DaySunData {
  return useMemo(() => getDaySunData(date, lat, lng), [date.toDateString(), lat, lng]);
}
