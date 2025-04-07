import { useState } from 'react';

import { Interface } from '@/interfaces';

export default function Stars({ rating, isClickable = false, onRatingChange }: Interface.StarsProps) {
    const [hoveredRating, setHoveredRating] = useState<number | null>(null);
    const displayRating = hoveredRating ?? rating;

    const handleStarClick = (starIndex: number) => {
        if (isClickable && onRatingChange) {
            onRatingChange(starIndex + 1);
        }
    };

    const handleStarHover = (starIndex: number) => {
        if (isClickable) {
            setHoveredRating(starIndex + 1);
        }
    };

    const handleMouseLeave = () => {
        if (isClickable) {
            setHoveredRating(null);
        }
    };

    return (
        <div 
            className="flex items-center"
            onMouseLeave={handleMouseLeave}
        >
            {Array.from({ length: 5 }).map((_, index) => (
                <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className={`size-6 cursor-${isClickable ? 'pointer' : 'default'} transition-colors duration-200`}
                    onClick={() => handleStarClick(index)}
                    onMouseEnter={() => handleStarHover(index)}
                    fill={index < displayRating ? '#3B82F6' : '#BFDBFE'} // blue-500 : blue-200
                >
                    <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        clipRule="evenodd"
                    />
                </svg>
            ))}
        </div>
    );
}
