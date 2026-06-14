import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StarRating } from '@/components/shared/StarRating';
import { MapPin, Trash2, Calendar } from 'lucide-react';
import { formatDate } from '@/lib/format-time';
import type { Session } from '@/lib/types';

interface SessionCardProps {
  session: Session;
  onDelete: (id: string) => void;
}

export function SessionCard({ session, onDelete }: SessionCardProps) {
  return (
    <Card className="card-premium h-full py-4">
      <CardContent className="flex h-full flex-col py-0">
        <div className="mb-2 flex items-start justify-between gap-2">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <Calendar className="h-3.5 w-3.5 text-amber" aria-hidden />
              <span className="text-sm font-semibold">{formatDate(new Date(session.date))}</span>
              {session.duringGoldenHour && (
                <Badge className="border-amber/30 bg-amber/10 text-xs text-amber">
                  Golden Hour
                </Badge>
              )}
            </div>
            {session.location && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3 text-sunset" aria-hidden />
                <span>{session.location}</span>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Delete session"
            className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
            onClick={() => onDelete(session.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        {session.notes && (
          <p className="mb-2 text-sm text-muted-foreground">{session.notes}</p>
        )}

        {session.rating > 0 && (
          <div className="mt-auto pt-1">
            <StarRating value={session.rating} readonly />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
