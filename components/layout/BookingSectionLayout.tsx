import React, { useEffect, useState } from "react";
import { Asterisk } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ViewMotionWrapper from "./Motion/ViewMotionWrapper";
import { useBookingForm } from "@/context/BookingFormContext";

interface BookingSectionLayoutProps {
  children: React.ReactNode;
  heading: {
    heading: string;
    description?: string;
  };
  section: string;
}

const BookingSectionLayout = ({
  children,
  heading,
  section,
}: BookingSectionLayoutProps) => {
  const { heading: title, description } = heading;
  const { inValidSection } = useBookingForm();
  const [alert, setAlert] = useState("");

  useEffect(() => {
    if (inValidSection.section === section) {
      setAlert(inValidSection.message);

      setTimeout(() => {
        setAlert("");
      }, 6000);
    }
  }, [inValidSection]);

  return (
    <ViewMotionWrapper y={30}>
      <div className="w-full mb-14 pt-4" id={section}>
        <motion.header
          className="flex flex-col items-center"
          // whileInView={{ y: [10, 0], opacity: [0, 1] }}
          // transition={{ duration: 1 }}
        >
          <h2 className="booking_title">{title}</h2>

          <Asterisk size={14} className="mt-2" />

          {description && (
            <p className="text-center text-[10px] tracking-[0.15em] italic mt-2">
              {description}
            </p>
          )}

          <AnimatePresence>
            {alert && (
              <motion.p 
                className="text-[#cc5656] text-[12px] mt-2 tracking-wider text-center"
                whileInView={{ opacity: [0,1]}}
                exit={{opacity: 0}}
                initial = {{opacity: 0}}
              >
                {alert}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.header>

        <div className="mt-4 transition-all duration-300">{children}</div>
      </div>
    </ViewMotionWrapper>
  );
};

export default BookingSectionLayout;
