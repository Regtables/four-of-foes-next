'use client'

import React from 'react'
import ButtonLrg from '../../buttons/ButtonLrg'
import { Asterisk } from 'lucide-react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { ClientType } from '@/types'

const PortalAuth = ({ client } : { client: ClientType }) => {
  const router = useRouter()
  const handleButtonClick = async () => {
    // const res = await axios.post('/api/clients/auth', { client })
    const res = await fetch('/api/clients/auth', {
      method: 'POST',
      body: JSON.stringify({ client })
    })

    console.log(res.status)

    if(res.status === 200){
      router.push('/portal')
    }
  }

  return (
    <div className='flex flex-col items-center justify-center  gap-4 border-2 border-[var(--color-gold)] rounded-[20px] h-[60%] w-[85%] lg:h-[60%] lg:w-[40%]'>
      <div className='text-[var(--color-gold)] uppercase tracking-[0.2em] text-2xl font-semibold heading-font'>
        Welcome, Patron
      </div>
      <Asterisk size = {10}/>
      <div className='w-[60%] text-center text-[12px] mb-4 italic tracking-[0.05em]'>
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