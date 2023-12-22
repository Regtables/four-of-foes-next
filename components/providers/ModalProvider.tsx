'use client'

import React, { useEffect, useState } from 'react'
import IndemnityModal from '../portal/modals/IndemnityModal/IndemnityModal'
import PrepModal from '../portal/modals/PrepModal/PrepModal'
import CalendarModal from '../portal/modals/CalendarModal/CalendarModal'

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
    </>
  )
}

export default ModalProvider