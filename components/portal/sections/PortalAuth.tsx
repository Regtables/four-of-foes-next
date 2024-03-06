'use client'

import React from 'react'
import ButtonLrg from '../../buttons/ButtonLrg'
import { Asterisk } from 'lucide-react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { ClientType } from '@/types'
import { usePortalProgress } from '@/context/PortalProgressContext'
import { useAuth } from '@/hooks/useAuth'

const PortalAuth = ({ client } : { client: ClientType }) => {
  const router = useRouter()
  const { setProgress } = usePortalProgress()
  const { signInClient } = useAuth()

  const handleButtonClick = async () => {
    try{
      await signInClient(client)
    } catch (error){
      console.log(error)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center  gap-4 border-2 border-[var(--color-gold)] rounded-[20px] h-[60%] w-[85%] lg:h-[60%] lg:w-[40%]'>
      <div className='text-[var(--color-gold)] uppercase tracking-[0.2em] text-2xl font-semibold heading-font'>
        Welcome, Patron
      </div>
      <Asterisk size = {10}/>
      <div className='w-[60%] text-center text-[12px] mb-4 tracking-[0.05em]'>
        Hi, Reghardt.
        Welcome to the Four of Foes booking Lounge. Kindly review our <span className='underline'>terms and conditions</span>, and then proceed.
      </div>

      <div onClick={handleButtonClick}>
        <ButtonLrg text='Enter Lounge' />
      </div>
    </div>
  )
}

export default PortalAuth