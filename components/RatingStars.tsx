"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

export function RatingStars({ rating, onRatingChange }: RatingStarsProps) {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex justify-center space-x-2 my-6">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
          onClick={() => onRatingChange(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          aria-label={`Rate ${star} stars`}
        >
          <Star
            className={cn(
              "w-12 h-12 md:w-16 md:h-16 transition-colors duration-200",
              (hoverRating || rating) >= star
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            )}
          />
        </button>
      ))}
    </div>
  );
}
