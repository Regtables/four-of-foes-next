'use client'

import React, { useEffect, useState } from 'react'
import IndemnityModal from '../portal/modals/IndemnityModal/IndemnityModal'
import PrepModal from '../portal/modals/PrepModal/PrepModal'
import CalendarModal from '../portal/modals/CalendarModal/CalendarModal'
import LocationModal from '../portal/modals/LocationModal/LocationModal'
import CancelAppointmentModal from '../portal/modals/CancelAppointmentModal/CancelAppointmentModal'
import BookingFormModal from '../modals/BookingFormModal'
import LoadingModal from '../modals/LoadingModal'
import AlertModal from '../modals/AlertModal'
import AftercareModal from '../portal/modals/AftercareModal'
import TattooPhotosModal from '../portal/modals/TattooPhotosModal'

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
      <LoadingModal />
      <AlertModal />
      <AftercareModal />
      <TattooPhotosModal />
    </>
  )
}

export default ModalProvider