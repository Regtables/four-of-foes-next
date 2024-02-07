import { useModal } from '@/hooks/useModal'
import React from 'react'
import ModalLayout from '../../layout/ModalLayout'

const LocationModal = () => {
  const { isOpen, types } = useModal()

  const isModalOpen = isOpen && types?.includes('location')

  return (
    <ModalLayout isOpen = {isModalOpen!} title='Location'>
      <></>
    </ModalLayout>
  )
}

export default LocationModal