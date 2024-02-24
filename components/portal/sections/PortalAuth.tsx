import React from 'react'
import ButtonLrg from '../../buttons/ButtonLrg'
import { Asterisk } from 'lucide-react'

const PortalAuth = () => {
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

      <ButtonLrg text='Enter Lounge' />
    </div>
  )
}

export default PortalAuth