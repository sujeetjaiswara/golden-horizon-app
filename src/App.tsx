import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { LocationProvider } from '@/context/LocationContext';
import { AppShell } from '@/components/layout/AppShell';
import { GradientBackground } from '@/components/shared/GradientBackground';
import { TodayView } from '@/components/today/TodayView';
import { UpcomingView } from '@/components/upcoming/UpcomingView';
import { SessionLogView } from '@/components/sessions/SessionLogView';
import { SettingsView } from '@/components/settings/SettingsView';

export default function App() {
  return (
    <BrowserRouter>
      <LocationProvider>
        <GradientBackground />
        <AppShell>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<TodayView />} />
              <Route path="/upcoming" element={<UpcomingView />} />
              <Route path="/sessions" element={<SessionLogView />} />
              <Route path="/settings" element={<SettingsView />} />
            </Routes>
          </AnimatePresence>
        </AppShell>
      </LocationProvider>
    </BrowserRouter>
  );
}
