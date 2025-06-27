"use client";

import axios from "axios";

import { useBookingForm } from "@/context/BookingFormContext";
import { getBase64 } from "@/app/lib/helpers";
import { useModal } from "@/context/ModalContext";

import BookingSectionLayout from "../layout/BookingSectionLayout";
import Information from "../booking/Information";
import CheckboxList from "../booking/CheckboxList";
import ArtistSelect from "../booking/ArtistSelect";
import DateSelect from "../booking/DateSelect";
import Idea from "../booking/Idea";
import References from "../booking/References";
import Submit from "../booking/Submit";
import Contact from "../booking/Contact";
import ViewMotionWrapper from "../layout/Motion/ViewMotionWrapper";
import BookingCollectionWrapper from "../layout/BookingCollectionWrapper";

const BookingForm = ({ data }: { data: any }) => {
  const bookingFormData = useBookingForm();
  const { handleModalOpen, handleModalClose } = useModal();

  const {
    information,
    handleInformationChange,
    idea,
    tourDate,
    setTourDate,
    setIdea,
    dimention,
    setDimention,
    placement,
    setPlacement,
    experience,
    setExperience,
    artist,
    setArtist,
    firstDate,
    secondDate,
    selectedFile1,
    selectedFile2,
    selectedFile3,
    selectedFile4,
    validateForm,
  } = bookingFormData;

  const handleSubmit = async () => {
    if (!validateForm()) return;

    let reference1;
    let reference2;
    let reference3;
    let reference4;

    if (selectedFile1) {
      reference1 = await getBase64(selectedFile1);
    }

    if (selectedFile2) {
      reference2 = await getBase64(selectedFile2);
    }

    if (selectedFile3) {
      reference3 = await getBase64(selectedFile3);
    }

    if (selectedFile4) {
      reference4 = await getBase64(selectedFile4);
    }

    const { name, surname, email, contact, city, instagram } = information;

    const data = {
      name,
      surname,
      email,
      contact,
      city,
      instagram,
      experience,
      placement,
      dimention,
      firstDate,
      secondDate,
      idea,
      artist,
      tourDate,
      reference1: reference1 ? reference1 : null,
      reference2: reference2 ? reference2 : null,
      reference3: reference3 ? reference3 : null,
      reference4: reference4 ? reference4 : null,
    };

    try {
      handleModalOpen("loading");

      const res = await axios.post("/api/booking", { data });
      console.log(res, "status");
      handleModalClose("loading");

      setTimeout(() => {
        handleModalOpen("success");
      }, 100);

      document.getElementById('submit-btn')!.style.display = 'none'
    } catch (error) {
      console.log(error);
      handleModalOpen("loading");
      setTimeout(() => {
        handleModalOpen("bookingError");
      }, 100);
    } finally {
      handleModalClose("loading");
    }
  };

  return (
    <form className="w-[90%] md:w-[60%] mx-6 mt-8 md:mt-11 transition-all duration-300">
      {/* <BookingCollectionWrapper collection="introduction">
        <BookingSectionLayout
          section="introduction"
          heading={{ heading: "Say Hello" }}
        >
          <Information
            informationData={information}
            handleChange={handleInformationChange}
          />
        </BookingSectionLayout>

        <BookingSectionLayout section="idea" heading={data["Tattoo Concept"]}>
          <Idea idea={idea} setIdea={setIdea} />
        </BookingSectionLayout>
      </BookingCollectionWrapper>

      <BookingCollectionWrapper collection="placement">
        <BookingSectionLayout section="dimention" heading={data["Dimensions"]}>
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
      </BookingCollectionWrapper>

      {/* <BookingCollectionWrapper collection="experience">
        <BookingSectionLayout section="experience" heading={data["Experience"]}>
          <CheckboxList
            options={data["Experience"].options}
            selectedOption={experience}
            handleOptionSelect={setExperience}
          />
        </BookingSectionLayout>

        <BookingSectionLayout section="artist" heading={data["Artists"]}>
          <ArtistSelect
            artists={data["Artists"].options}
            selectedArtist={artist}
            handleArtistSelect={setArtist}
            selectedTourDate={tourDate}
            handleTourDateSelect={setTourDate}
          />
        </BookingSectionLayout>
      </BookingCollectionWrapper> */}

      <BookingCollectionWrapper collection="date">
        <BookingSectionLayout
          section="preffered date"
          heading={data["Preferred Date"]}
        >
          <DateSelect />
        </BookingSectionLayout>
      </BookingCollectionWrapper>

      <BookingCollectionWrapper collection="references">
        <BookingSectionLayout section="references" heading={data["References"]}>
          <References />
        </BookingSectionLayout>
      </BookingCollectionWrapper>

      <BookingCollectionWrapper collection="submit">
        <BookingSectionLayout
          section="submit"
          heading={{ heading: "Thank you" }}
        >
          <Submit handleClick={handleSubmit} />
        </BookingSectionLayout>
      </BookingCollectionWrapper>

      <BookingCollectionWrapper collection="contact">
        <ViewMotionWrapper duration={1}>
          <Contact />
        </ViewMotionWrapper>
      </BookingCollectionWrapper> */}
    </form>
  );
};

export default BookingForm;
