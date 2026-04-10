let scheduledTimeout: ReturnType<typeof setTimeout> | null = null;

export function scheduleNotification(title: string, body: string, atTime: Date): void {
  cancelScheduledNotification();

  const now = Date.now();
  const delay = atTime.getTime() - now;

  if (delay <= 0) return;

  scheduledTimeout = setTimeout(() => {
    if (Notification.permission === 'granted') {
      new Notification(title, { body, icon: '/golden-hour-icon.png' });
    }
    scheduledTimeout = null;
  }, delay);
}

export function cancelScheduledNotification(): void {
  if (scheduledTimeout !== null) {
    clearTimeout(scheduledTimeout);
    scheduledTimeout = null;
  }
}
