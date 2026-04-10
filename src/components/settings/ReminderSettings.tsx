import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Bell, BellOff } from 'lucide-react';
import { useLocation } from '@/context/LocationContext';
import { useNotificationPermission } from '@/hooks/useNotificationPermission';
import { REMINDER_OPTIONS } from '@/lib/constants';

export function ReminderSettings() {
  const { settings, updateSettings } = useLocation();
  const { permission, requestPermission, supported } = useNotificationPermission();

  async function toggleReminders() {
    if (!settings.remindersEnabled) {
      if (permission !== 'granted') {
        const result = await requestPermission();
        if (result !== 'granted') return;
      }
      updateSettings({ ...settings, remindersEnabled: true });
    } else {
      updateSettings({ ...settings, remindersEnabled: false });
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <Bell className="h-4 w-4" />
          Reminders
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {!supported && (
          <p className="text-xs text-muted-foreground">
            Notifications are not supported in this browser.
          </p>
        )}

        <div className="flex items-center justify-between">
          <span className="text-sm">Golden hour reminders</span>
          <Button
            variant={settings.remindersEnabled ? 'default' : 'outline'}
            size="sm"
            onClick={toggleReminders}
            disabled={!supported}
          >
            {settings.remindersEnabled ? (
              <><Bell className="mr-1 h-3.5 w-3.5" /> On</>
            ) : (
              <><BellOff className="mr-1 h-3.5 w-3.5" /> Off</>
            )}
          </Button>
        </div>

        {permission === 'denied' && (
          <p className="text-xs text-destructive">
            Notification permission was denied. Please enable it in your browser settings.
          </p>
        )}

        {settings.remindersEnabled && (
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">Remind me</label>
            <Select
              value={settings.reminderMinutesBefore.toString()}
              onValueChange={(val) =>
                updateSettings({ ...settings, reminderMinutesBefore: parseInt(val) })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {REMINDER_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value.toString()}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
