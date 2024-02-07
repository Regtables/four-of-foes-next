import { useBookingForm } from "@/context/BookingFormContext";
import React from "react";
import { InView } from "react-intersection-observer";

const BookingCollectionWrapper = ({
  children,
  collection,
  // handleCollectionChange,
}: {
  children: React.ReactNode;
  collection: string;
  // handleCollectionChange: (collection: string) => void;
}) => {
  const { handleCollectionChange, currentCollection } = useBookingForm()
  return (
    <div className="w-full relative" id = {`${collection}`}>
      <InView className="absolute top-[50%]" onChange={(inView, entry) => inView && handleCollectionChange(collection) } />

      {children}
    </div>
  );
};

export default BookingCollectionWrapper;
