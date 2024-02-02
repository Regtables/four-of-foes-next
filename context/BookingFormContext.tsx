'use client'

import React, { ChangeEvent, createContext, useContext, useState } from "react";

const defaultState: any = {
  information: {
    name: "",
    surname: "",
    email: "",
    contact: "",
    city: "",
  },
  idea: "",
  artist: "",
  placement: "",
  dimention: "",
  experience: "",
  preferedDates: {
    firstDate: "",
    secondDate: "",
  },
  references: [],
  handleInformationChange: (e: ChangeEvent<HTMLInputElement>) => {},
  setIdea: (idea: string) => {},
  setPlacement: (placement: string) => {},
  setDimention: (dimention: string) => {},
  setExperience: (experience: string) => {}
};

const BookingFormContext = createContext(defaultState);

export const BookingFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [information, setInformation] = useState(defaultState.information);
  const [idea, setIdea] = useState("");
  const [artist, setArtist] = useState("flintstone");
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

  const handleInformationChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('changing information')
    setInformation({ ...information, [e.target.name]: e.target.value });
  };

  return (
    <BookingFormContext.Provider value={{
      information,
      artist,
      handleInformationChange,
      dimention,
      placement,
      experience,
      // firstDate,
      idea,
      setIdea,
      setPlacement,
      setDimention,
      setExperience,
    }}>
      {children}
    </BookingFormContext.Provider>
  )
};

export const useBookingForm = () => {
  return useContext(BookingFormContext)
}


