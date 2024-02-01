'use client'

import React, { useEffect, useState } from 'react'
import IndemnityModal from '../portal/modals/IndemnityModal/IndemnityModal'
import PrepModal from '../portal/modals/PrepModal/PrepModal'
import CalendarModal from '../portal/modals/CalendarModal/CalendarModal'
import LocationModal from '../portal/modals/LocationModal/LocationModal'
import CancelAppointmentModal from '../portal/modals/CancelAppointmentModal/CancelAppointmentModal'
import BookingFormModal from '../modals/BookingFormModal'

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if(!isMounted) return null

  return (
    <>
      <IndemnityModal />
      <PrepModal />
      <CalendarModal />
      <LocationModal />
      <CancelAppointmentModal />
      <BookingFormModal />
    </>
  )
}

export default ModalProvider