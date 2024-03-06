import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  Fragment,
} from "react";

import meh from "@/public/meh.png";
import solid from "@/public/solid.png";
import awesome from "@/public/awesome.png";

import Rating from "./Rating";

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

const FeedbackSlider = ({
  currentRating,
  setCurrentRating,
  disabled,
}: {
  currentRating: number;
  setCurrentRating: Dispatch<SetStateAction<number>>;
  disabled: boolean;
}) => {
  const [activeRating, setActiveRating] = useState("");

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
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        {RATINGS.map((rating, i) => (
          <Fragment key={i}>
            <Rating rating={rating} activeRating={activeRating} />

            {i < RATINGS.length - 1 && (
              <div
                className={`h-[1px] bg-white w-10 mx-[10px] mb-[20px] transition-opacity duration-1000 ${
                  activeRating === "meh" || activeRating === "awesome"
                    ? "opacity-20"
                    : ""
                }`}
              />
            )}
          </Fragment>
        ))}
      </div>

      <input
        type="range"
        className="text-black bg-black"
        value={currentRating}
        onChange={(e) => setCurrentRating(e.target.value as unknown as number)}
      />

      {/* <Slider defaultValue={[50]} max = {100} min = {1} step={1} value={[currentRating]}/> */}
    </div>
  );
};

export default FeedbackSlider;
