'use client'

import { useModal } from '@/hooks/useModal'
import React from 'react'
import Popup from '../layout/Popup'
import { Asterisk } from 'lucide-react'
import ButtonPill from '../buttons/ButtonPill'
import Image from 'next/image'

const AlertModal = () => {
  const { isOpen, types, data, handleClose } = useModal()

  // if(!data?.alertData) return null

  const isModalOpen = isOpen && types?.includes('success')


  return (
    <Popup isOpen = {isModalOpen!} fade>
      <div className='border-4 border-[var(--color-gold)] w-[80%] flex flex-col items-center text-center gap-8 py-8 px-10 rounded-2xl my-auto'>
        <h2 className='text-[var(--color-gold)] uppercase tracking-[0.1em] text-2xl font-bold heading-font'>Success!</h2>
        <Asterisk size = {15} />

        <p className='text-center text-[10px] tracking-[0.15em] italic'>Thank you for submitting your booking form. Please allow us some time to process your request</p>

        <div className='min-w-[80px] min-h-[40px]' onClick={() => handleClose('success')}>
          <ButtonPill text= {'done'} />
        </div>

        {/* {signature && ( */}
          <div className='relative h-[90px] w-[150px]'>
            <Image 
              src = '/signature.png'
              fill
              alt = "Ted Faulmann's Signature"
              className='object-cover'
              priority
            />
          </div>
        {/* )} */}
      </div>
    </Popup>
  )
}

export default AlertModal