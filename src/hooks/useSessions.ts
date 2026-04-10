import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS } from '@/lib/constants';
import type { Session } from '@/lib/types';

export function useSessions() {
  const [sessions, setSessions] = useLocalStorage<Session[]>(STORAGE_KEYS.SESSIONS, []);

  const addSession = useCallback(
    (session: Omit<Session, 'id' | 'createdAt'>) => {
      const newSession: Session = {
        ...session,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };
      setSessions((prev) => [newSession, ...prev]);
    },
    [setSessions]
  );

  const deleteSession = useCallback(
    (id: string) => {
      setSessions((prev) => prev.filter((s) => s.id !== id));
    },
    [setSessions]
  );

  return { sessions, addSession, deleteSession };
}
