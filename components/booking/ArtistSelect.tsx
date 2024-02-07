'use client'

import React, { Fragment, useState } from "react";

import CheckboxList from "./CheckboxList";

interface ArtistSelectProps {
  artists: any[],
  selectedArtist: any,
  handleArtistSelect: any
  selectedTourDate:any
  handleTourDateSelect: any
}

const ArtistSelect = ({
  artists,
  selectedArtist,
  handleArtistSelect,
  selectedTourDate,
  handleTourDateSelect,
}: ArtistSelectProps) => {
  const [activeArtist, setActiveArtist] = useState(artists.find((artist) => artist.title === selectedArtist))

  const artistOptions = artists.map((artist) => ({
    choice: { title: artist.title },
  }));

  const handleArtistSelectClick = (choice: string) => {
    setActiveArtist({ title: '', tourOptions: [] })
    
    handleTourDateSelect('')
    handleArtistSelect(choice)
    const artist = artists.find(options => options.title === choice)

    setActiveArtist(artist)
    console.log(artist)
  }

  return (
    <div className="grid grid-cols-2 justify-center w-full" id = 'tourDate'>
      <div>
        <CheckboxList
          single
          //@ts-ignore
          options={artistOptions}
          selectedOption={selectedArtist}
          handleOptionSelect={handleArtistSelectClick}
        />
      </div>

      <div>
        <CheckboxList
          single
          options={activeArtist?.tourOptions}
          selectedOption={selectedTourDate}
          artist
          handleOptionSelect={handleTourDateSelect}
        />
      </div>
    </div>
  );  
};

export default ArtistSelect;
