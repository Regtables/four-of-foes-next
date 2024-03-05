'use client'

import React, { useEffect, useState } from 'react'

import IndemnityModal from '../portal/modals/IndemnityModal/IndemnityModal'
import PrepModal from '../portal/modals/PrepModal/PrepModal'
import CalendarModal from '../portal/modals/CalendarModal/CalendarModal'
import LocationModal from '../portal/modals/LocationModal/LocationModal'
import CancelAppointmentModal from '../portal/modals/CancelAppointmentModal/CancelAppointmentModal'
import LoadingModal from '../modals/LoadingModal'
import AlertModal from '../modals/AlertModal'
import TattooPhotosModal from '../portal/modals/TattooPhotosModal'
import BookingSuccessModal from '../modals/BookingSucessModal'
import ImagePreviewModal from '../modals/ImagePreviewModal'

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
      <TattooPhotosModal />
      <BookingSuccessModal />
      <ImagePreviewModal />
    </>
  )
}

export default ModalProvider