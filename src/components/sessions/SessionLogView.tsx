import { useSessions } from '@/hooks/useSessions';
import { PageTransition } from '@/components/layout/PageTransition';
import { SessionForm } from './SessionForm';
import { SessionCard } from './SessionCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion } from 'framer-motion';

export function SessionLogView() {
  const { sessions, addSession, deleteSession } = useSessions();

  return (
    <PageTransition>
      <div className="flex flex-col gap-4 lg:gap-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-amber">Sessions</p>
            <h2 className="mt-0.5 text-lg font-semibold tracking-tight">Session Log</h2>
          </div>
          {sessions.length > 0 && (
            <span className="text-xs text-muted-foreground">
              {sessions.length} logged
            </span>
          )}
        </div>

        {sessions.length === 0 ? (
          <EmptyState
            title="No sessions yet"
            description="Tap the + button to log your first photo session"
          />
        ) : (
          <ScrollArea className="h-[calc(100vh-220px)]">
            <div className="grid gap-3 pr-2 sm:grid-cols-2 sm:gap-4">
              {sessions.map((session, i) => (
                <motion.div
                  key={session.id}
                  className="h-full"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                >
                  <SessionCard session={session} onDelete={deleteSession} />
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        )}

        <SessionForm onSubmit={addSession} />
      </div>
    </PageTransition>
  );
}
