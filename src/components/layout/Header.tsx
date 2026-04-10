import { MapPin } from 'lucide-react';
import { useLocation } from '@/context/LocationContext';

export function Header() {
  const { locationName, loading } = useLocation();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-amber to-sunset">
            <span className="text-sm">☀️</span>
          </div>
          <h1 className="text-lg font-semibold tracking-tight">Golden Horizon</h1>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          <span>{loading ? 'Locating...' : locationName}</span>
        </div>
      </div>
    </header>
  );
}
