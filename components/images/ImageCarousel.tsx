"use client";

import React, { useState } from "react";
import Popup from "@/components/layout/Popup";
import Image from "next/image";
import Swipeable from "../layout/Swipeable";
import { ArrowLeft, ArrowRight } from "lucide-react";

const ImageCarousel = ({
  i,
  images,
  handleClose,
}: {
  images: any[];
  i?: number;
  handleClose?: () => void;
}) => {
  const [index, setIndex] = useState(0);

  const handlePrev = () => {
    if (index !== 0) {
      setIndex((prev) => prev - 1);
    } else {
      setIndex(images.length - 1);
    }
  };

  const handleNext = () => {
    console.log("next");
    if (index !== images.length - 1) {
      setIndex((prev) => prev + 1);
    } else {
      setIndex(0);
    }
  };

  return (
    // <Swipeable onRight={handlePrev} onLeft={handleNext}>
      <div className="h-full w-full lg:w-[60%] relative overflow-hidden">
        <div
          className={`flex h-full transition-translate duration-500 relative `}
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((image, i) => (
            <div className={`w-full h-full min-w-full relative`} key={i}>
              {/* <GalleryTile image={image} /> */}
              <Image 
                src = {image}
                fill
                className="object-cover"
                alt = {`Tattoo shop photo`}
              />

            </div>
          ))}
        </div>

        <div
          className="absolute top-0 h-full flex items-center left-[5px]"
          onClick={handlePrev}
        >
          <ArrowLeft
            color="white"
            size={14}
            className="cursor-pointer"
          />
        </div>

        <div
          className="absolute top-0 h-full flex items-center right-[5px]"
          onClick={handleNext}
        >
          <ArrowRight
            color="white"
            size={14}
            className="cursor-pointer"
          />
        </div>

        <div className="absolute bottom-[20px] flex gap-2 justify-center w-full">
          {images.map((image, i) => (
            <div
              className={`h-[6px] w-[6px] cursor-pointer rounded-xl transition-colors duration-300 ${
                index === i ? "bg-[grey]" : " bg-[#e7e7e7]"
              }`}
              key={i}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    // </Swipeable>
  );
};

export default ImageCarousel;
