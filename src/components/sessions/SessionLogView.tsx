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
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Session Log</h2>

        {sessions.length === 0 ? (
          <EmptyState
            title="No sessions yet"
            description="Tap the + button to log your first photo session"
          />
        ) : (
          <ScrollArea className="h-[calc(100vh-240px)]">
            <div className="space-y-3 pr-2">
              {sessions.map((session, i) => (
                <motion.div
                  key={session.id}
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
