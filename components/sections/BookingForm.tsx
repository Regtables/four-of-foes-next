"use client";

import React, { ChangeEvent, useState } from "react";
import Information from "../booking/Information";
import BookingSectionLayout from "../layout/BookingSectionLayout";
import { BookingSection } from "@/types";
import CheckboxList from "../booking/CheckboxList";
import { useBookingForm } from "@/context/BookingFormContext";
import ArtistSelect from "../booking/ArtistSelect";
import DateSelect from "../booking/DateSelect";
import { X } from "lucide-react";
import { useModal } from "@/hooks/useModal";

const INFORMATION = {
  name: "",
  surname: "",
  email: "",
  contact: "",
  city: "",
};

const ARTISTS = [
  {
    title: "Ted Flinstxne",
    tourOptions: [
      {
        choice: { title: "Berlin (August 2024)" },
      },
      {
        choice: { title: "London (September 2024)" },
      },
      {
        choice: { title: "Amsterdam (October 2024)" },
      },
    ],
  },
  {
    title: "Artist 2",
    tourOptions: [
      {
        choice: { title: "Paris (June 2024)" },
      },
      {
        choice: { title: "New York (December 2024)" },
      },
      {
        choice: { title: "Amsterdam (October 2024)" },
      },
      {
        choice: { title: "Moscow (October 2054)" },
      },
    ],
  },
];

const BookingForm = ({ data }: { data: any }) => {
  const [information, setInformation] = useState(INFORMATION);
  const [idea, setIdea] = useState("");
  const [artist, setArtist] = useState("Ted Flinstxne");
  const [tourDate, setTourDate] = useState("");
  const [placement, setPlacement] = useState("");
  const [secondPlacement, setSecondPlacement] = useState("");
  const [dimention, setDimention] = useState("");
  const [experience, setExperience] = useState("");
  const [firstDate, setFirstDate] = useState("");
  const [secondDate, setSecondDate] = useState("");
  const [selectedFile1, setSelectedFile1] = useState("");
  const [selectedFile2, setSelectedFile2] = useState("");
  const [selectedFile3, setSelectedFile3] = useState("");
  const [selectedFile4, setSelectedFile4] = useState("");

  const { handleClose } = useModal()

  const handleInformationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInformation({ ...information, [e.target.name]: e.target.value });
  };

  // const { idea, setIdea } = useBookingForm()
  // console.log(information)
  // console.log(handleInformationChange)

  return (
    <div className="w-[90%] mx-6 my-1">
      <div className="fixed bottom-6 end-[46%] w-8 h-8 flex items-center justify-center rounded-full text-center bg-white" onClick={handleClose}>
        <X color="black" size = {18}/>
      </div>
      <BookingSectionLayout
        section="introduction"
        heading={{ heading: "A small introduction" }}
      >
        <Information
          informationData={information}
          handleChange={handleInformationChange}
        />
      </BookingSectionLayout>

      <BookingSectionLayout section="idea" heading={data["Your Tattoo"]}>
        <textarea
          className="bg-transparent outline-none border-[1px] border-white w-full rounded-md"
          rows={8}
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
        ></textarea>
      </BookingSectionLayout>

      <BookingSectionLayout section="dimentions" heading={data["Dimensions"]}>
        <CheckboxList
          options={data["Dimensions"].options}
          selectedOption={dimention}
          handleOptionSelect={setDimention}

        />
      </BookingSectionLayout>

      <BookingSectionLayout section="placement" heading={data["Placement"]}>
        <CheckboxList
          options={data["Placement"].options}
          selectedOption={placement}
          handleOptionSelect={setPlacement}
       
        />
      </BookingSectionLayout>

      <BookingSectionLayout section="artist" heading={data["Artist"]}>
        <ArtistSelect
          artists={ARTISTS}
          selectedArtist={artist}
          handleArtistSelect={setArtist}
          selectedTourDate={tourDate}
          handleTourDateSelect={setTourDate}
        />
      </BookingSectionLayout>

      <BookingSectionLayout section= 'preffered date' heading={data["Preferred Date"]}>
        <DateSelect />
      </BookingSectionLayout>
    </div>
  );
};

export default BookingForm;
