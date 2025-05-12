'use client'

import React, { ChangeEvent, createContext, useContext, useEffect, useState } from "react";

const defaultState: any = {
  information: {
    name: "",
    surname: "",
    email: "",
    contact: "",
    city: "",
    instagram: ""
  },
  idea: "",
  artist: "",
  tourDate: "",
  placement: "",
  dimention: "",
  experience: "",
  firstDate: "",
  secondDate: "",
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
  const [artist, setArtist] = useState("Ted Faulmann");
  const [tourDate, setTourDate] = useState("");
  const [placement, setPlacement] = useState("");
  const [dimention, setDimention] = useState("");
  const [experience, setExperience] = useState("");
  const [firstDate, setFirstDate] = useState("");
  const [secondDate, setSecondDate] = useState("");
  const [selectedFile1, setSelectedFile1] = useState("");
  const [selectedFile2, setSelectedFile2] = useState("");
  const [selectedFile3, setSelectedFile3] = useState("");
  const [selectedFile4, setSelectedFile4] = useState("");
  const [currentCollection, setCurrentCollection] = useState('introduction')
  const [inValidSection, setInValidSection] = useState({
    section: '',
    message: ''
  })

  const handleNavCloseWhileBookingFormIsToggled = (e: any) => {
    
  }

  const handleInformationChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value

    if(e.target.name !== 'instagram'){
      setInformation({ ...information, [e.target.name]: newValue });
    } else {
      if(information.instagram.length !== 0){
        setInformation({...information, ['instagram']: newValue})
      } else {
        setInformation({...information, ['instagram']: '@'})
      }
    }
  };

  const handleCollectionChange = (collection: string) => {
    setCurrentCollection(collection)
  }

  const validateForm = () => {
    const scrollBehavior: ScrollIntoViewOptions = {
      behavior: 'smooth',
      block: 'center' as ScrollLogicalPosition,
      inline: 'center' as ScrollLogicalPosition
    }

    const { name, surname, email, contact, city } = information

    if(!name || !surname || !email || !contact){
      document.getElementById('introduction')?.scrollIntoView(scrollBehavior)
      setInValidSection({ section: 'introduction', message: 'Almost there!'})

      return false
    }

    else if(!email.includes('@') || !email.includes('.')){
      document.getElementById('introduction')?.scrollIntoView(scrollBehavior)
      setInValidSection({ section: 'introduction', message: 'Almost there!'})

      return false
    }

    if(!idea){
      document.getElementById('idea')?.scrollIntoView(scrollBehavior)
      setInValidSection({ section: 'idea', message: 'Almost there!'})

      return false
    }

    else if(!dimention){
      document.getElementById('dimention')?.scrollIntoView(scrollBehavior)
      setInValidSection({ section: 'dimention', message: 'Almost there!'})

      return false
    }

    else if(!placement){
      document.getElementById('placement')?.scrollIntoView(scrollBehavior)
      setInValidSection({ section: 'placement', message: 'Almost there!'})

      return false
    }

    // else if(!experience){
    //   document.getElementById('experience')?.scrollIntoView(scrollBehavior)
    //   setInValidSection({ section: 'experience', message: 'Almost there!'})

    //   return false
    // }

    else if(!tourDate){
      document.getElementById('tourDate')?.scrollIntoView(scrollBehavior)
      setInValidSection({ section: 'artist', message: 'Almost there!'})

      return false
    }

    else if(!firstDate || !secondDate){
      document.getElementById('preffered date')?.scrollIntoView(scrollBehavior)
      setInValidSection({ section: 'preffered date', message: 'Almost there!'})

      return false
    }

    return true
  }

  return (
    <BookingFormContext.Provider value={{
      information,
      artist,
      tourDate,
      dimention,
      placement,
      experience,
      idea,
      selectedFile1,
      selectedFile2,
      selectedFile3,
      selectedFile4,
      firstDate,
      secondDate,
      currentCollection,
      inValidSection,
      handleCollectionChange,
      handleInformationChange,
      setIdea,
      setPlacement,
      setDimention,
      setExperience,
      setArtist,
      setTourDate,
      setFirstDate,
      setSecondDate,
      setSelectedFile1,
      setSelectedFile2,
      setSelectedFile3,
      setSelectedFile4,
      validateForm
    }}>
      {children}
    </BookingFormContext.Provider>
  )
};

export const useBookingForm = () => {
  const context = useContext(BookingFormContext)

  return context
}


