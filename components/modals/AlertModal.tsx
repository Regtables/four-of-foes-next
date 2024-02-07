'use client'

import { useModal } from '@/hooks/useModal'
import React from 'react'
import Popup from '../layout/Popup'
import { Asterisk } from 'lucide-react'
import ButtonPill from '../buttons/ButtonPill'
import Image from 'next/image'

const AlertModal = () => {
  const { isOpen, types, data } = useModal()

  if(!data?.alertData) return null

  const isModalOpen = isOpen && types?.includes('alert')

  const { alertData } = data
  const { title, content, confirm, handleConfirm, signature } = alertData

  return (
    <Popup isOpen = {isModalOpen!} isAlert>
      <div className='border-4 border-[var(--color-gold)] w-[80%] flex flex-col items-center text-center gap-8 py-16 px-10 rounded-2xl my-auto'>
        <h2 className='text-[var(--color-gold)] uppercase tracking-[0.2em] text-2xl font-semibold heading-font'>{title}</h2>
        <Asterisk size = {15} />

        <p className='text-[14px] tracking-wider font-light'>{content}</p>

        <div className='min-w-[80px] min-h-[40px]' onClick={() => handleConfirm()}>
          <ButtonPill text= {confirm} />
        </div>

        {signature && (
          <div className='relative h-[200px] w-[200px]'>
            <Image 
              src = '/signature.png'
              fill
              alt = "Ted Faulmann's Signature"
              className='object-cover'
              priority
            />
          </div>
        )}
      </div>
    </Popup>
  )
}

export default AlertModal