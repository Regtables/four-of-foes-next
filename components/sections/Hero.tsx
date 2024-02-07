'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

import PageHeading from '../headings/PageHeading'
import ButtonLrg from '../buttons/ButtonLrg'
import { useModal } from '@/hooks/useModal'
import { BookingSection } from '@/types'
import ViewMotionWrapper from '../layout/Motion/ViewMotionWrapper'

const Hero = ({ bookingFormData } : { bookingFormData: any }) => {
  const { handleOpen } = useModal()
  
  const handleEnquiryClick = () => {
    handleOpen('booking', { bookingFormData })
  }

  return (
    <div className='relative h-screen w-screen pt-10'>
      <motion.div 
        className='z-1'
        whileInView={{ opacity: [0, 1]}}
        initial = {{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <Image 
          src = {'/landing-bg.jpeg'}
          fill
          alt = 'Ted doing a tattoo'
          className='object-cover md:object-top'
          priority
        />
      </motion.div>

      <ViewMotionWrapper className='absolute z-2 w-full flex justify-center'>
        <PageHeading />
      </ViewMotionWrapper>

      <motion.div 
        className='relative z-1 w-full flex justify-center h-full items-center'
        whileInView={{ y: [10, 0], opacity: [0,1] }}
        initial = {{ y: 10, opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <ButtonLrg text = 'tattoo enquiry' handleClick={handleEnquiryClick} />
      </motion.div>
    </div>
  )
}

export default Hero