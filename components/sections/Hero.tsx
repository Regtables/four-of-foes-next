'use client'

import React from 'react'
import Image from 'next/image'

import PageHeading from '../headings/PageHeading'
import ButtonLrg from '../buttons/ButtonLrg'
import { useModal } from '@/hooks/useModal'
import { BookingSection } from '@/types'

const Hero = ({ bookingFormData } : { bookingFormData: any }) => {
  const { handleOpen } = useModal()
  
  const handleEnquiryClick = () => {
    handleOpen('booking', bookingFormData)
  }

  return (
    <div className='relative h-screen w-screen pt-10'>
      <div className='z-1'>
        <Image 
          src = {'/lounge-ted.JPG'}
          fill
          alt = 'Ted doing a tattoo'
          className='object-cover'
        />
      </div>

      <div className='absolute z-2 w-full flex justify-center'>
        <PageHeading />
      </div>

      <div className='relative z-1 w-full flex justify-center h-full items-center'>
        <ButtonLrg text = 'tattoo enquiry' handleClick={handleEnquiryClick} />
      </div>
    </div>
  )
}

export default Hero