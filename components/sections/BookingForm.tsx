"use client";

import axios from "axios";

import { useBookingForm } from "@/context/BookingFormContext";
import { getBase64 } from "@/app/lib/helpers";
import { useModal } from "@/hooks/useModal";

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

const ARTISTS = [
  {
    title: "Ted Faulmann",
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
  const bookingFormData = useBookingForm();
  const { handleOpen, handleClose, types, data: modalData } = useModal()

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
    validateForm
  } = bookingFormData;

  const handleSubmit = async () => {
    // e.preventDefault();

    // if(!validateForm()) return 
    
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

    const { name, surname, email, contact, city } = information

    const data = {
      name,
      surname,
      email,
      contact,
      city,
      experience,
      placement,
      dimention,
      firstDate,
      secondDate,
      idea,
      reference1: reference1 ? reference1 : null,
      reference2: reference2 ? reference2 : null,
      reference3: reference3 ? reference3 : null,
      reference4: reference4 ? reference4 : null,
    };

    try{
      handleOpen('loading')

      await axios.post('/api/booking', { data })

      handleOpen('alert', { alertData: {
        title: 'Sent!',
        content: 'Thank you for submitting your booking form. Please allow us some time to process your request',
        confirm: 'Okay',
        signature: true,
        handleConfirm: () => handleClose('alert', { alertData: { title: '', content: '', confirm: '', handleConfirm: () => {}} })
      }})

      document.getElementById('submit-btn')!.style.display = 'none'
    } catch (error){
      console.log(error)

      handleOpen('alert', { alertData: {
        title: 'Request Error',
        content: 'There was an error with your submitting your request. Please confirm that you have completed all the fields and make sure that your references are in the format of either .jpeg or .webp',
        confirm: 'okay',
        handleConfirm: () => handleClose('alert', { alertData: { title: '', content: '', confirm: '', handleConfirm: () => {}} })
      }})
    } finally{
      handleClose('loading')
    }
  };


  return (
    <form className="w-[90%] md:w-[60%] mx-6 mt-20 transition-all duration-300">
      <BookingCollectionWrapper collection="introduction">
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

      <BookingCollectionWrapper collection="experience">
        <BookingSectionLayout section="experience" heading={data["Experience"]}>
          <CheckboxList
            options={data["Experience"].options}
            selectedOption={experience}
            handleOptionSelect={setExperience}
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
      </BookingCollectionWrapper>

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
        <BookingSectionLayout section="submit" heading={{ heading: "Thank you" }}>
          <Submit handleClick={handleSubmit}/>
        </BookingSectionLayout>
      </BookingCollectionWrapper>


      <BookingCollectionWrapper collection="contact">
        <ViewMotionWrapper duration={1}>
          <Contact />
        </ViewMotionWrapper>
      </BookingCollectionWrapper>
    </form>
  );
};

export default BookingForm;
