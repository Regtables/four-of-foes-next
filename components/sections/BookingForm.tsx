"use client";

import React, { ChangeEvent, useState } from "react";
import Information from "../booking/Information";
import BookingSectionLayout from "../layout/BookingSectionLayout";
import { BookingSection } from "@/types";

const INFORMATION = {
  name: "",
  surname: "",
  email: "",
  contact: "",
  city: "",
};

const BookingForm = ({ data }: { data: BookingSection[] }) => {
  const [information, setInformation] = useState(INFORMATION);

  console.log(data)

  const handleInformationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInformation({ ...information, [e.target.name]: e.target.value });
  };
  return (
    <div className="w-90 px-6 py-8">
      <BookingSectionLayout
        section="introduction"
        heading={{ heading: "A small introduction" }}
      >
        <Information
          informationData={information}
          handleChange={handleInformationChange}
        />
      </BookingSectionLayout>

      <BookingSectionLayout section="idea" heading={data['Your Tattoo']}>
        <textarea className="bg-transparent outline-none border-[1px] border-white w-full rounded-md" rows={8}>

        </textarea>
      </BookingSectionLayout>

      <BookingSectionLayout section = 'placement' heading={data['Dimensions']}>
        <></>
      </BookingSectionLayout>
    </div>
  );
};

export default BookingForm;
