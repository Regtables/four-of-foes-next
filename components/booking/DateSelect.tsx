import React, { useState } from 'react'
import Calendar from './Calendar'
import { useBookingForm } from '@/context/BookingFormContext'

const DateSelect = () => {
  const { firstDate, setFirstDate, secondDate, setSecondDate } = useBookingForm()

  return (
    <div className='mt-6 flex flex-col gap-[20px] md:flex-row'>
      <div className='w-full'>
        <Calendar confirmedDate= {firstDate} setConfirmedDate={setFirstDate} />
      </div>

      <div className='w-full'>
        <Calendar confirmedDate= {secondDate} setConfirmedDate={setSecondDate} />
      </div>
    </div>
  )
}

export default DateSelect