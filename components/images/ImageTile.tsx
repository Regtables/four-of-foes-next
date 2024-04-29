import React from 'react'
import Image from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'

import { portalClient } from '@/app/lib/sanity'

const ImageTile = ({ image } : { image: any }) => {
  // const { src, loader }: any = useNextSanityImage(portalClient, image)
  return (
    <div className='min-h-full min-w-full relative'>
      <Image src = {image} fill alt = 'an image' className='object-cover rounded-xl' />
    </div>
  )
}

export default ImageTile