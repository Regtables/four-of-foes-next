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
    handleArtistSelect(choice)
    const artist = artists.find(options => options.title === choice)

    setActiveArtist(artist)
  }

  return (
    <div className="flex justify-center gap-6">
      <div>
        <CheckboxList
          cols={1}
          //@ts-ignore
          options={artistOptions}
          selectedOption={selectedArtist}
          handleOptionSelect={handleArtistSelectClick}
        />
      </div>

      <div>
        <CheckboxList
          cols = {1}
          options={activeArtist?.tourOptions}
          selectedOption={selectedTourDate}
          handleOptionSelect={handleTourDateSelect}
        />
      </div>
    </div>
  );  
};

export default ArtistSelect;
