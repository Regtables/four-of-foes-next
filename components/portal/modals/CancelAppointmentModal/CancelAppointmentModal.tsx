import { useModal } from '@/hooks/useModal'
import React from 'react'
import ModalLayout from '../../layout/ModalLayout'
import ButtonPill from '@/components/buttons/ButtonPill'

const CancelAppointmentModal = () => {
  const { isOpen, type } = useModal()

  const isModalOpen = isOpen && type === 'appointmentActions'

  return (
    <ModalLayout isOpen = {isModalOpen} title='cancel/resheudle'>
      <div className='flex flex-col gap-6 items-center'>
        <div className='flex flex-col gap-2'>
          <h3 className='title'>Resheudle Appointment</h3>

          calendar

          <div className='w=full h-[28px]'>
            <ButtonPill text = 'request new date' />
          </div>
        </div>

        <div className='flex flex-col gap-4'>
          <h3 className='title text-center'>Cancel Appointment</h3>
          
          <div className='w-[250px] h-[28px]'>
            <ButtonPill text='request cancelation' fill />
          </div>
        </div>
      </div>
    </ModalLayout>
  )
}

export default CancelAppointmentModal