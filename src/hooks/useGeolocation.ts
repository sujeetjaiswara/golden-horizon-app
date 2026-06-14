import { useState, useEffect } from 'react';

interface GeolocationState {
  lat: number | null;
  lng: number | null;
  error: string | null;
  loading: boolean;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>(() => ({
    lat: null,
    lng: null,
    error: navigator.geolocation ? null : 'Geolocation not supported',
    loading: !!navigator.geolocation,
  }));

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          error: null,
          loading: false,
        });
      },
      (err) => {
        setState(s => ({ ...s, error: err.message, loading: false }));
      },
      { enableHighAccuracy: false, timeout: 10000 }
    );
  }, []);

  return state;
}
