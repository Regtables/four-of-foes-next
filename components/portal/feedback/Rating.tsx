import React from "react";

import { RatingType } from "@/types";
import Image from "next/image";

const Rating = ({
  rating,
  activeRating,
}: {
  rating: RatingType;
  activeRating: string;
}) => {
  const { icon } = rating
  return (
    <div
      className={`flex flex-col items-center min-w-[60px] transition-opacity duration-1000 ${
        activeRating === rating.rating ? '' : "opacity-20"
      }`}
      id = {rating.rating === 'awesome' ? 'awesome' : ''}
    >
      <Image src = {icon} height={30} width={rating.rating === 'awesome' ? 39 : 30} alt = {`${rating.rating} face icon`} />
      <h3 className="uppercase italic text-[10px] mt-2">{rating.rating}</h3>
    </div>
  );
};

export default Rating;
