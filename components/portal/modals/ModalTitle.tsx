import React from 'react'
import Partition from '../PortalLinkList/Partition'

const ModalTitle = ({ children } : { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col text-center gap-2 min-w-[40%] mx-auto'>
      <div className='w-50'>
        <Partition />
      </div>
      
      <h2 className='title'>{children}</h2>
    </div>
  )
}

export default ModalTitle