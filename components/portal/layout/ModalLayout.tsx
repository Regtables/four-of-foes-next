import Popup from '@/components/layout/Popup'
import React from 'react'
import ModalTitle from '../modals/ModalTitle'
import ViewMotionWrapper from '@/components/layout/Motion/ViewMotionWrapper'

interface ModalLayoutProps {
  isOpen: boolean,
  title: string,
  children: React.ReactNode
}

const ModalLayout = ({ isOpen, title, children } : ModalLayoutProps ) => {
  return (
    <>
      {isOpen && (
        <Popup isOpen = {isOpen}>
          <ViewMotionWrapper y = {-10}>
            <ModalTitle>
              {title}
            </ModalTitle>
          </ViewMotionWrapper>

          <div className='pt-8 px-8'>
            {children}
          </div>
        </Popup>
      )}
    </>
  )
}

export default ModalLayout