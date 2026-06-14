import { useState, useEffect } from 'react';
import { formatDuration } from '@/lib/format-time';

const ZERO = { hours: 0, minutes: 0, seconds: 0 };

export function useCountdown(targetDate: Date | null) {
  const targetTime = targetDate?.getTime() ?? null;
  const [timeLeft, setTimeLeft] = useState(ZERO);

  useEffect(() => {
    if (targetTime === null) return;

    const update = () => setTimeLeft(formatDuration(targetTime - Date.now()));
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetTime]);

  return targetTime === null ? ZERO : timeLeft;
}
