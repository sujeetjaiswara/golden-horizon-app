import { MapPin } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useLocation } from '@/context/LocationContext';
import { links } from './nav-links';
import { Logo } from './Logo';

export function Header() {
  const { locationName, loading } = useLocation();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-3 lg:max-w-3xl">
        <div className="flex items-center gap-2.5">
          <Logo className="h-9 w-9 rounded-full shadow-sm ring-1 ring-amber/20" />
          <h1 className="text-lg font-semibold tracking-tight">Golden Horizon</h1>
        </div>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {links.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm transition-colors ${
                  isActive
                    ? 'bg-primary/10 font-medium text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`
              }
            >
              <Icon className="h-4 w-4" aria-hidden />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 rounded-full bg-muted/60 px-2.5 py-1 text-xs font-medium text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 text-amber" aria-hidden />
          <span>{loading ? 'Locating...' : locationName}</span>
        </div>
      </div>
    </header>
  );
}
