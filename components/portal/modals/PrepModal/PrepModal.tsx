'use client'

import React from 'react'

import { useModal } from '@/hooks/useModal'
import Popup from '../../../layout/Popup'
import ModalTitle from '../ModalTitle'
import PrepCard from '../../prep/PrepCard'
import ModalLayout from '../../layout/ModalLayout'

const PrepModal = () => {
  const { isOpen, type, data } = useModal()

  const isModalOpen = isOpen && type === 'prep'

  return (
    <ModalLayout isOpen = {isModalOpen} title='prep card'>
      <PrepCard tips = {data as string[]} />
    </ModalLayout>
  )
}

export default PrepModal