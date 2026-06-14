import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { StarRating } from '@/components/shared/StarRating';
import { Plus } from 'lucide-react';
import type { Session } from '@/lib/types';

interface SessionFormProps {
  onSubmit: (session: Omit<Session, 'id' | 'createdAt'>) => void;
}

export function SessionForm({ onSubmit }: SessionFormProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [rating, setRating] = useState(0);
  const [duringGoldenHour, setDuringGoldenHour] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({ date, location, notes, rating, duringGoldenHour });
    setDate(new Date().toISOString().slice(0, 10));
    setLocation('');
    setNotes('');
    setRating(0);
    setDuringGoldenHour(false);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          aria-label="Log a session"
          className="fixed bottom-24 right-4 z-50 h-14 w-14 rounded-full bg-gradient-to-br from-amber to-sunset shadow-lg ring-1 ring-amber/30 transition-shadow hover:shadow-xl lg:bottom-8 lg:right-8"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Log a Session</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Date</label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Location</label>
            <Input
              placeholder="Where did you shoot?"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Notes</label>
            <Textarea
              placeholder="How was the light? Any highlights?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Rating</label>
            <StarRating value={rating} onChange={setRating} />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="goldenHour"
              checked={duringGoldenHour}
              onChange={(e) => setDuringGoldenHour(e.target.checked)}
              className="h-4 w-4 rounded border-border accent-amber"
            />
            <label htmlFor="goldenHour" className="text-sm">
              Shot during golden hour
            </label>
          </div>
          <Button type="submit" className="w-full bg-gradient-to-r from-amber to-sunset text-white">
            Save Session
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
