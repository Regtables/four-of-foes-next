import React from 'react'
import Image from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'

import { useModal } from '@/hooks/useModal'
import { portalClient } from '@/app/lib/sanity'

import Popup from '../layout/Popup'

const ImagePreviewModal = () => {
  
  const { isOpen, types, handleClose, data } = useModal()
  if(!data?.activeImage) return null
  const { src, loader}:any = useNextSanityImage(portalClient, data?.activeImage)

  const isModalOpen = isOpen && types?.includes('imagePreview')

  return (
    data?.activeImage && (
      <Popup isOpen = {isModalOpen!} fade>
        <div className='flex relative lg:h-[80vh] lg:w-[60vw] h-[70vh] w-[85vw] m-auto'>
          <Image 
            src = {src}
            loader={loader}
            fill
            alt = 'A photo of your tattoo'
            className='object-cover rounded-2xl'
          />
        </div>

        <div onClick={() => handleClose('imagePreview')}>
          close
        </div>
      </Popup>
    )
  )
}

export default ImagePreviewModal