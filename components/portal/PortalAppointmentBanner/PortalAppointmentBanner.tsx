'use client'

import React from 'react'
import { Dot } from 'lucide-react'
import { format } from 'date-fns'

interface AppointmentType {
  artist: string,
  date: Date
  studio: string,
  country: string
}

const PortalAppointmentBanner = ({ artist, date, studio, country } : AppointmentType) => {
  //@ts-ignore
  const formattedDate = format(new Date(date), 'dd MMMM / hhaa')
  
  console.log(formattedDate)
  return (
    <div className='flex text-[8px] font-light uppercase items-center tracking-[0.1em] py-4'>
      {artist} <Dot size={10} /> {formattedDate} <Dot size={10}  /> {studio} <Dot  size={10} /> {country}
    </div>
  )
}

export default PortalAppointmentBanner