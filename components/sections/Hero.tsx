"use client";

import React, { Suspense } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "@/hooks/useModal";
import PageHeading from "../headings/PageHeading";
import ButtonLrg from "../buttons/ButtonLrg";
import ViewMotionWrapper from "../layout/Motion/ViewMotionWrapper";
import { useAppSettings } from "@/context/AppSettingsContext";

const Hero = ({ bookingFormData }: { bookingFormData: any }) => {
  const { handleOpen, types } = useModal();
  const { toggleIntro } = useAppSettings();

  console.log("Booking Form Data:", bookingFormData);

  // console.log(bookingFormData)

  const handleEnquiryClick = () => {
    handleOpen("booking", { bookingFormData });
  };

  const introVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const variants = toggleIntro ? {} : introVariants;

  return (
    <div className="relative h-screen w-screen pt-8">
      <AnimatePresence>
        {!types?.includes("booking") && !toggleIntro && (
          <ViewMotionWrapper className="absolute z-10 w-full flex justify-center" exit={{y: -20, opacity: 0}} y = {-20} duration={1}>
            <PageHeading caption="To give anything less than your best is to sacrifice the gift"/>
         </ViewMotionWrapper>
        )}
      </AnimatePresence>
      

      <Suspense>
        <motion.div
          className="z-0"
          variants={variants}
          // initial="hidden"
          whileInView={{ opacity: [0,1]}}
          initial = {{opacity: 0}}
          animate="visible"
          transition={{ duration: 1.5, delay: 0 }}
        >
          <Image
            src={"/landing-bg.jpeg"}
            fill
            alt="Ted doing a tattoo"
            className="object-cover md:object-top"
            priority
            sizes="(max-width:450px) 100vw, (max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          />
        </motion.div>
      </Suspense>

      <AnimatePresence>
        {!types?.includes("booking") && !toggleIntro && (
          <motion.div
            className="relative z-1 w-full flex justify-center h-full items-center"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 1, delay: 0 }}
          >
            <ButtonLrg text="send request" handleClick={handleEnquiryClick} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hero;
