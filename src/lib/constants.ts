import type { UserSettings } from './types';

export const DEFAULT_LAT = 40.7128;
export const DEFAULT_LNG = -74.006;
export const DEFAULT_LOCATION_NAME = 'New York, NY';

export const STORAGE_KEYS = {
  SETTINGS: 'golden-horizon-settings',
  SESSIONS: 'golden-horizon-sessions',
} as const;

export const DEFAULT_SETTINGS: UserSettings = {
  locationMode: 'auto',
  manualLat: DEFAULT_LAT,
  manualLng: DEFAULT_LNG,
  locationName: DEFAULT_LOCATION_NAME,
  remindersEnabled: false,
  reminderMinutesBefore: 30,
};

export const REMINDER_OPTIONS = [
  { value: 15, label: '15 minutes before' },
  { value: 30, label: '30 minutes before' },
  { value: 60, label: '1 hour before' },
];
