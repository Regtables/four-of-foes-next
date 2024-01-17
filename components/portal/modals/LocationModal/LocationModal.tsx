import { useModal } from '@/hooks/useModal'
import React from 'react'
import ModalLayout from '../../layout/ModalLayout'

const LocationModal = () => {
  const { isOpen, type } = useModal()

  const isModalOpen = isOpen && type === 'location'

  return (
    <ModalLayout isOpen = {isModalOpen} title='Location'>
      <></>
    </ModalLayout>
  )
}

export default LocationModal