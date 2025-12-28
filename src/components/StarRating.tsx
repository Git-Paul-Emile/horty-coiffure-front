import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
}

const StarRating = ({ rating, onRatingChange, readonly = false }: StarRatingProps) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => !readonly && onRatingChange?.(star)}
          className={`transition-colors ${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'}`}
          disabled={readonly}
        >
          <Star
            size={24}
            className={`${
              star <= rating
                ? 'fill-primary text-primary'
                : 'text-muted-foreground hover:text-primary'
            }`}
          />
        </button>
      ))}
    </div>
  );
};

export default StarRating;