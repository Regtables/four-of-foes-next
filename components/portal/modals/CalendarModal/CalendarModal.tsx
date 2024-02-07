import React from 'react'
import ModalLayout from '../../layout/ModalLayout'
import { useModal } from '@/hooks/useModal'
import { format } from 'date-fns'

const CalendarModal = () => {
  const { isOpen, types, data } = useModal()

  const isModalOpen = isOpen && types?.includes('calendar')

  //@ts-ignore
  const date = format(new Date(), 'dd MMMM yyyy')

  return (
    <ModalLayout title='Calendar Invitation' isOpen = {isModalOpen!}>
      <div className='flex flex-col items-center gap-4'>
        <p className='text-[9px] uppercase text-center tracking-[0.1em]'>
          Your appointment is on the {date}, tap accept to add the appoitnent to your calendar.
        </p>

        <button className='border border-1-white text-[9px] px-6 py-1 rounded-full uppercase tracking-[0.3em] max-w-[100px]'>
          Accept
        </button>
      </div>
    </ModalLayout>
  )
}

export default CalendarModal