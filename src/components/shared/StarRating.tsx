import { Star } from 'lucide-react';

interface StarRatingProps {
  value: number;
  onChange?: (rating: number) => void;
  readonly?: boolean;
}

export function StarRating({ value, onChange, readonly }: StarRatingProps) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(star)}
          className={`transition-transform ${readonly ? '' : 'hover:scale-110 cursor-pointer'}`}
        >
          <Star
            className={`h-5 w-5 ${
              star <= value
                ? 'fill-amber text-amber'
                : 'fill-none text-muted-foreground/30'
            }`}
          />
        </button>
      ))}
    </div>
  );
}
