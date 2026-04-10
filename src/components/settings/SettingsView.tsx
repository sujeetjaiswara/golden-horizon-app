import { PageTransition } from '@/components/layout/PageTransition';
import { LocationSettings } from './LocationSettings';
import { ReminderSettings } from './ReminderSettings';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Database, Trash2 } from 'lucide-react';
import { STORAGE_KEYS } from '@/lib/constants';
import { useLocation } from '@/context/LocationContext';
import { useReminders } from '@/hooks/useReminders';

export function SettingsView() {
  const { lat, lng, settings } = useLocation();

  useReminders(lat, lng, settings.remindersEnabled, settings.reminderMinutesBefore);

  function clearSessions() {
    localStorage.removeItem(STORAGE_KEYS.SESSIONS);
    window.location.reload();
  }

  return (
    <PageTransition>
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Settings</h2>
        <LocationSettings />
        <ReminderSettings />

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Database className="h-4 w-4" />
              Data
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-xs text-muted-foreground">
              All data is stored locally in your browser. Nothing is sent to any server.
            </p>
            <Separator />
            <Button variant="destructive" size="sm" onClick={clearSessions}>
              <Trash2 className="mr-1 h-3.5 w-3.5" />
              Clear All Sessions
            </Button>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground pb-4">
          Golden Horizon v1.0 — Sun data powered by SunCalc
        </p>
      </div>
    </PageTransition>
  );
}
