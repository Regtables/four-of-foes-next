import React, { useEffect, useState } from 'react'

import meh from "@/public/meh.png";
import solid from "@/public/solid.png";
import awesome from "@/public/awesome.png";

import Rating from './Rating';

const RATINGS = [
  {
    rating: "meh",
    portion: 15,
    icon: meh,
  },
  {
    rating: "solid",
    portion: 16,
    icon: solid,
  },
  {
    rating: "awesome",
    portion: 86,
    icon: awesome,
  },
];

const FeedbackSlider = ({ currentRating } : { currentRating: number }) => {
  const [activeRating, setActiveRating] = useState("")
  
  useEffect(() => {
    if (currentRating! < 15) {
      setActiveRating("meh");
    } else if (currentRating < 85 && currentRating > 15) {
      setActiveRating("solid");
    } else {
      setActiveRating("awesome");
    }
  }, [currentRating]);

  return (
    <div>
        <div className='flex justify-around items-center'>
          {RATINGS.map((rating, i) => (
            <>
              <Rating rating={rating} activeRating={activeRating} />

              {i < RATINGS.length - 1 && (
                <div
                  className={`h-[1px] bg-white w-10 mx-[10px] mb-[20px] ${
                    activeRating === "meh" || activeRating === "awesome"
                      ? ''
                      : ""
                  }`}
                />
              )}
            </>
          ))}
        </div>
    </div>
  )
}

export default FeedbackSlider