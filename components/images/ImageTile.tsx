import React from 'react'
import Image from 'next/image'

const ImageTile = ({ image }) => {
  return (
    <div className='min-h-full min-w-full relative'>
      <Image src = {image} fill alt = 'an image' />
    </div>
  )
}

export default ImageTile