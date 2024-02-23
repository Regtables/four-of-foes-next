import { useModal } from '@/hooks/useModal'
import React from 'react'
import ModalLayout from '../../layout/ModalLayout'
import ShopProfile from '../../ShopProfile/ShopProfile'

const SHOP = {
  name: 'hood7',
  logo: '',
  instagram: {
    handle: '@hood7',
    link: ''
  },
  location: {
    address: '123 somewhere sick, Woodstock, 8019, Cape Town, South Africa',
    link: ''
  },
  images: [
    '/lounge-ted.JPG',
    '/portal-bg.png',
    '/landing-bg.jpeg'
  ]
}

const LocationModal = () => {
  const { isOpen, types } = useModal()

  const isModalOpen = isOpen && types?.includes('location')

  return (
    <ModalLayout isOpen = {isModalOpen!} title='Location'>
      <ShopProfile shop={SHOP} />
    </ModalLayout>
  )
}

export default LocationModal