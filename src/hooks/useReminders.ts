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
  const eventStart = event?.window.start.getTime();
  const eventType = event?.window.type;
  const eventActive = event?.isActive;

  useEffect(() => {
    if (!enabled || eventStart === undefined || eventActive) {
      cancelScheduledNotification();
      return;
    }

    const notifyAt = new Date(eventStart - minutesBefore * 60 * 1000);

    if (notifyAt.getTime() > Date.now()) {
      const label = eventType === 'morning' ? 'Morning' : 'Evening';
      scheduleNotification(
        `${label} Golden Hour Soon`,
        `Golden hour starts in ${minutesBefore} minutes. Grab your camera!`,
        notifyAt
      );
    }

    return () => cancelScheduledNotification();
  }, [enabled, minutesBefore, eventStart, eventType, eventActive]);
}
