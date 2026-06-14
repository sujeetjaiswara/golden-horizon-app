import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { DEFAULT_SETTINGS, STORAGE_KEYS } from '@/lib/constants';
import type { LocationData, UserSettings } from '@/lib/types';

interface LocationContextValue extends LocationData {
  settings: UserSettings;
  updateSettings: (settings: UserSettings) => void;
  loading: boolean;
  geoError: string | null;
}

const LocationContext = createContext<LocationContextValue | null>(null);

export function LocationProvider({ children }: { children: ReactNode }) {
  const geo = useGeolocation();
  const [settings, setSettings] = useLocalStorage<UserSettings>(
    STORAGE_KEYS.SETTINGS,
    DEFAULT_SETTINGS
  );

  useEffect(() => {
    if (settings.locationMode === 'auto' && geo.lat !== null && geo.lng !== null) {
      setSettings((prev) => ({
        ...prev,
        manualLat: geo.lat!,
        manualLng: geo.lng!,
      }));
    }
  }, [geo.lat, geo.lng, settings.locationMode, setSettings]);

  const lat = settings.locationMode === 'auto' && geo.lat !== null ? geo.lat : settings.manualLat;
  const lng = settings.locationMode === 'auto' && geo.lng !== null ? geo.lng : settings.manualLng;
  const locationName = settings.locationName;
  const mode = settings.locationMode;

  return (
    <LocationContext.Provider
      value={{
        lat,
        lng,
        locationName,
        mode,
        settings,
        updateSettings: setSettings,
        loading: settings.locationMode === 'auto' && geo.loading,
        geoError: settings.locationMode === 'auto' ? geo.error : null,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components -- hook colocated with provider
export function useLocation() {
  const ctx = useContext(LocationContext);
  if (!ctx) throw new Error('useLocation must be used within LocationProvider');
  return ctx;
}
