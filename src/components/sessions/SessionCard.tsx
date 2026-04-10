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
    <Card className="transition-transform hover:scale-[1.02]">
      <CardContent className="py-4">
        <div className="mb-2 flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-sm font-medium">{formatDate(new Date(session.date))}</span>
              {session.duringGoldenHour && (
                <Badge className="bg-amber/10 text-amber border-amber/30 text-xs">
                  Golden Hour
                </Badge>
              )}
            </div>
            {session.location && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span>{session.location}</span>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={() => onDelete(session.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        {session.notes && (
          <p className="mb-2 text-sm text-muted-foreground">{session.notes}</p>
        )}

        {session.rating > 0 && <StarRating value={session.rating} readonly />}
      </CardContent>
    </Card>
  );
}
