"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Triangle } from "react-loader-spinner";

import Popup from "../layout/Popup";
import ViewMotionWrapper from "../layout/Motion/ViewMotionWrapper";
import { AnimatePresence } from "framer-motion";

const Intro = ({ toggleIntro }: { toggleIntro: boolean }) => {
  const [toggleLogo, setToggleLogo] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setToggleLogo(true);
    }, 2000);
  }, []);

  return (
    <Popup isOpen={toggleIntro} opacity={100}>
      {/* <ViewMotionWrapper
        scale={0.9}
        duration={3}
        y={0}
        className="flex justify-center h-full my-auto items-center flex-[0.05] z-10 relative w-[300px] mx-auto"
      > */}
      {/* <AnimatePresence> */}
      {toggleLogo && (
        <ViewMotionWrapper
          scale={0.9}
          duration={3}
          y = {0}
          className="flex justify-center h-full my-auto items-center flex-[0.05] z-10 relative w-[300px] mx-auto"
        >
          <Image
            src="/logo-big.jpeg"
            fill
            alt="four of foes logo"
            className="object-cover"
          />
        </ViewMotionWrapper>
      )}
      {/* </AnimatePresence> */}

      {/* <AnimatePresence>
        {!toggleLogo && (
          <ViewMotionWrapper
            duration={1}
            className="absolute flex justify-center h-full my-auto items-center flex-[0.05] z-1 w-[300px] mx-auto"
          >
            <Triangle
              visible={true}
              height="40"
              width="40"
              color="white"
              ariaLabel="triangle-loading"
            />
          </ViewMotionWrapper>
        )}
      </AnimatePresence> */}
      {/* </ViewMotionWrapper> */}
    </Popup>
  );
};

export default Intro;
