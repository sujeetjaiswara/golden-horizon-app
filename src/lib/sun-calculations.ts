import SunCalc from 'suncalc';
import { addDays } from 'date-fns';
import type { DaySunData, GoldenHourEvent, GoldenHourWindow } from './types';

function isValidDate(d: Date): boolean {
  return d instanceof Date && !isNaN(d.getTime());
}

export function getDaySunData(date: Date, lat: number, lng: number): DaySunData {
  const times = SunCalc.getTimes(date, lat, lng);

  const isPolar = !isValidDate(times.sunrise) || !isValidDate(times.sunset);

  if (isPolar) {
    const position = SunCalc.getPosition(date, lat, lng);
    const polarType = position.altitude > 0 ? 'midnight-sun' : 'polar-night';
    const noon = new Date(date);
    noon.setHours(12, 0, 0, 0);

    return {
      date,
      sunrise: noon,
      sunset: noon,
      goldenHourMorningStart: noon,
      goldenHourMorningEnd: noon,
      goldenHourEveningStart: noon,
      goldenHourEveningEnd: noon,
      solarNoon: noon,
      isPolar: true,
      polarType,
    };
  }

  return {
    date,
    sunrise: times.sunrise,
    sunset: times.sunset,
    goldenHourMorningStart: times.sunrise,
    goldenHourMorningEnd: times.goldenHourEnd,
    goldenHourEveningStart: times.goldenHour,
    goldenHourEveningEnd: times.sunset,
    solarNoon: times.solarNoon,
    isPolar: false,
  };
}

export function getWeekSunData(startDate: Date, lat: number, lng: number): DaySunData[] {
  return Array.from({ length: 7 }, (_, i) =>
    getDaySunData(addDays(startDate, i), lat, lng)
  );
}

export function getNextGoldenHourEvent(
  now: Date,
  lat: number,
  lng: number
): GoldenHourEvent | null {
  for (let dayOffset = 0; dayOffset < 2; dayOffset++) {
    const checkDate = addDays(now, dayOffset);
    const data = getDaySunData(checkDate, lat, lng);

    if (data.isPolar) return null;

    const windows: GoldenHourWindow[] = [
      { start: data.goldenHourMorningStart, end: data.goldenHourMorningEnd, type: 'morning' },
      { start: data.goldenHourEveningStart, end: data.goldenHourEveningEnd, type: 'evening' },
    ];

    for (const window of windows) {
      if (now >= window.start && now <= window.end) {
        return { window, isActive: true, startsIn: 0 };
      }
      if (now < window.start) {
        return { window, isActive: false, startsIn: window.start.getTime() - now.getTime() };
      }
    }
  }

  return null;
}

export function getSunPosition(date: Date, lat: number, lng: number) {
  return SunCalc.getPosition(date, lat, lng);
}
