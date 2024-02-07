import { Instagram, Mail } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Contact = () => {
  return (
    <div className='pb-20'>
      <div className='relative h-[150px] lg:h-[200px] lg:w-[400px] lg:mx-auto ml-3'>
        <Image 
          src = '/rose.png'
          fill
          alt = 'rose'
          className='object-cover lg:ml-2'
        />
      </div>

      <div className='flex flex-col items-center gap-2 mt-4'>
        {/* <h2 className='uppercase tracking-[0.5em] text-[12px]'>Contact</h2>
        <p>*</p> */}

        <div className='flex items-center gap-2 tracking-[0.3em] font-light text-[10px]'>
          <Instagram size={15}/>
          @fourofoes
        </div>

        <div className='flex items-center gap-2 tracking-[0.3em] font-light text-[10px]'>
          <Mail size={15}/>
          info@fourofoes.com
        </div>

        <Link href= '/privacy-policy' className='flex items-center gap-2 tracking-[0.3em] font-light text-[10px] underline'>
          privacy policy
        </Link>

        <p className='tracking-[0.3em] font-light text-[10px] mt-4'>© 2024 by Four of Foes</p>
      </div>
    </div>
  )
}

export default Contact