import { useEffect } from 'react';
import { useGoldenHour } from './useGoldenHour';
import { scheduleNotification, cancelScheduledNotification } from '@/lib/notification-scheduler';

export function useReminders(
  lat: number,
  lng: number,
  enabled: boolean,
  minutesBefore: number
) {
  const event = useGoldenHour(lat, lng);

  useEffect(() => {
    if (!enabled || !event || event.isActive) {
      cancelScheduledNotification();
      return;
    }

    const notifyAt = new Date(event.window.start.getTime() - minutesBefore * 60 * 1000);

    if (notifyAt.getTime() > Date.now()) {
      const label = event.window.type === 'morning' ? 'Morning' : 'Evening';
      scheduleNotification(
        `${label} Golden Hour Soon`,
        `Golden hour starts in ${minutesBefore} minutes. Grab your camera!`,
        notifyAt
      );
    }

    return () => cancelScheduledNotification();
  }, [enabled, minutesBefore, event?.window.start.getTime(), lat, lng]);
}
