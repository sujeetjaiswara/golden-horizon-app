import type { ReactNode } from 'react';
import { Header } from './Header';
import { BottomNav } from './BottomNav';

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-lg px-4 pb-28 pt-6 lg:max-w-3xl lg:pb-10">{children}</main>
      <BottomNav />
    </div>
  );
}
