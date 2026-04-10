import { useState, useEffect } from 'react';
import { formatDuration } from '@/lib/format-time';

export function useCountdown(targetDate: Date | null) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!targetDate) {
      setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    function update() {
      const ms = targetDate!.getTime() - Date.now();
      setTimeLeft(formatDuration(ms));
    }

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetDate?.getTime()]);

  return timeLeft;
}
