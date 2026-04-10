export interface Session {
  id: string;
  date: string;
  location: string;
  notes: string;
  rating: number;
  duringGoldenHour: boolean;
  createdAt: string;
}

export interface UserSettings {
  locationMode: 'auto' | 'manual';
  manualLat: number;
  manualLng: number;
  locationName: string;
  remindersEnabled: boolean;
  reminderMinutesBefore: number;
}

export interface DaySunData {
  date: Date;
  sunrise: Date;
  sunset: Date;
  goldenHourMorningStart: Date;
  goldenHourMorningEnd: Date;
  goldenHourEveningStart: Date;
  goldenHourEveningEnd: Date;
  solarNoon: Date;
  isPolar: boolean;
  polarType?: 'midnight-sun' | 'polar-night';
}

export interface GoldenHourWindow {
  start: Date;
  end: Date;
  type: 'morning' | 'evening';
}

export interface GoldenHourEvent {
  window: GoldenHourWindow;
  isActive: boolean;
  startsIn: number; // ms until start
}

export interface LocationData {
  lat: number;
  lng: number;
  locationName: string;
  mode: 'auto' | 'manual';
}
