import { format, formatDistanceToNow } from 'date-fns';

export function formatTime(date: Date): string {
  return format(date, 'h:mm a');
}

export function formatTimeShort(date: Date): string {
  return format(date, 'h:mm');
}

export function formatDate(date: Date): string {
  return format(date, 'MMM d, yyyy');
}

export function formatDayShort(date: Date): string {
  return format(date, 'EEE');
}

export function formatDayDate(date: Date): string {
  return format(date, 'EEE, MMM d');
}

export function formatRelative(date: Date): string {
  return formatDistanceToNow(date, { addSuffix: true });
}

export function formatDuration(ms: number): { hours: number; minutes: number; seconds: number } {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { hours, minutes, seconds };
}

export function padZero(n: number): string {
  return n.toString().padStart(2, '0');
}
