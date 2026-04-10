import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, LocateFixed } from 'lucide-react';
import { useLocation } from '@/context/LocationContext';

export function LocationSettings() {
  const { settings, updateSettings, geoError } = useLocation();

  const isAuto = settings.locationMode === 'auto';

  function toggleMode() {
    updateSettings({
      ...settings,
      locationMode: isAuto ? 'manual' : 'auto',
    });
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <MapPin className="h-4 w-4" />
          Location
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm">Auto-detect location</span>
          <Button variant={isAuto ? 'default' : 'outline'} size="sm" onClick={toggleMode}>
            <LocateFixed className="mr-1 h-3.5 w-3.5" />
            {isAuto ? 'Auto' : 'Manual'}
          </Button>
        </div>

        {geoError && isAuto && (
          <p className="text-xs text-destructive">
            Location error: {geoError}. Switch to manual entry.
          </p>
        )}

        {!isAuto && (
          <div className="space-y-2">
            <div>
              <label className="mb-1 block text-xs text-muted-foreground">Location Name</label>
              <Input
                value={settings.locationName}
                onChange={(e) =>
                  updateSettings({ ...settings, locationName: e.target.value })
                }
                placeholder="City, State"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="mb-1 block text-xs text-muted-foreground">Latitude</label>
                <Input
                  type="number"
                  step="0.0001"
                  value={settings.manualLat}
                  onChange={(e) =>
                    updateSettings({ ...settings, manualLat: parseFloat(e.target.value) || 0 })
                  }
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-muted-foreground">Longitude</label>
                <Input
                  type="number"
                  step="0.0001"
                  value={settings.manualLng}
                  onChange={(e) =>
                    updateSettings({ ...settings, manualLng: parseFloat(e.target.value) || 0 })
                  }
                />
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
