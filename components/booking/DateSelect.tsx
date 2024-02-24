import React, { useState } from 'react'
import Calendar from './Calendar'
import { useBookingForm } from '@/context/BookingFormContext'
import ViewMotionWrapper from '../layout/Motion/ViewMotionWrapper'

const DateSelect = () => {
  const { firstDate, setFirstDate, secondDate, setSecondDate } = useBookingForm()

  return (
    <div className='mt-6 flex flex-col gap-[20px] md:flex-row'>
      <ViewMotionWrapper className='w-full' x = {-10} y = {0} duration={1.5}>
        <Calendar confirmedDate= {firstDate} setConfirmedDate={setFirstDate} />
      </ViewMotionWrapper>

      <ViewMotionWrapper className='w-full' x = {10} y = {0} duration={1.5}>
        <Calendar confirmedDate= {secondDate} setConfirmedDate={setSecondDate} />
      </ViewMotionWrapper>
    </div>
  )
}

export default DateSelect