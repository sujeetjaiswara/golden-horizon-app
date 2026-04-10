import type { ReactNode } from 'react';
import { Header } from './Header';
import { BottomNav } from './BottomNav';

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-lg px-4 pb-24 pt-4">{children}</main>
      <BottomNav />
    </div>
  );
}
