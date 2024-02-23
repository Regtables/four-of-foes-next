import React from 'react'

import { useModal } from '@/hooks/useModal'

import ModalLayout from '../layout/ModalLayout'
import PortalTattooPhotoCarousel from '../PortalTattooPhotoCarousel/PortalTattooPhotoCarousel'

const images = [
  '/lounge-ted.JPG',
  '/portal-bg.png',
  '/landing-bg.jpeg'
]

const TattooPhotosModal = () => {
  const { isOpen, types, data } = useModal()

  const isModalOpen = isOpen && types?.includes('photos') 

  return (
    <ModalLayout isOpen = {isModalOpen!} title='Your Photos'>
      <div className='h-full w-full'>
        <PortalTattooPhotoCarousel images = {images} />
      </div>
    </ModalLayout>
  )
}

export default TattooPhotosModal