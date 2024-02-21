import React from "react";
import { motion } from "framer-motion";

import { useBookingForm } from "@/context/BookingFormContext";
import { cn } from "@/app/lib/utils";

const COLLECTIONS = [
  "introduction",
  "placement",
  "experience",
  "date",
  "references",
  "submit",
  "contact",
];

const BookingSideNav = () => {
  const { currentCollection } = useBookingForm();

  return (
    <div className="flex flex-col gap-2 min-w-[150px]">
      {COLLECTIONS.map((collection, i) => (
        <motion.div
          key={i}
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.5, delay: 0.1 * i }}
          exit={{ x: [0, 20] }}
        >
          <a
            href={`#${collection}`}
            className={cn(
              "text-[8px] uppercase tracking-[0.3em] transition-all duration-500 text-[#c8c8c8] hover:text-white hover:text-[9px]",
              currentCollection === collection && "text-[12px] text-white"
            )}
          >
            {collection}
          </a>
        </motion.div>
      ))}
    </div>
  );
};

export default BookingSideNav;
