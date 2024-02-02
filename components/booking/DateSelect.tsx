import React from 'react'
import Calendar from './Calendar/Calendar'

const DateSelect = () => {
  return (
    <div className='mt-6 flex flex-col gap-[20px]'>
      <Calendar />

      <Calendar />
    </div>
  )
}

export default DateSelect