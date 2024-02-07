import React from "react";

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
    <div className="flex flex-col gap-4 min-w-[150px]">
      {COLLECTIONS.map((collection, i) => (
        <a
          href={`#${collection}`}
          key = {i}
          className={cn(
            "text-[8px] uppercase tracking-[0.3em] transition-all duration-500",
            currentCollection === collection && "text-[12px]"
          )}
        >
          {collection}
        </a>
      ))}
    </div>
  );
};

export default BookingSideNav;
