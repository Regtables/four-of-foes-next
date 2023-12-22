'use client'

import React, { Fragment, useRef } from 'react'
import { motion } from 'framer-motion'

import { useModal } from '@/hooks/useModal'

const Popup = ({ children, isOpen } : { children: React.ReactNode, isOpen: boolean }) => {
  const { handleClose } = useModal()

  const content: any = useRef(null);

  const handleClickOutside = (e: any) => {
    if (content.current && !content.current.contains(e.target)) {
      handleClose();
      console.log('clicking')
    }
  };
  return (
    <Fragment>
      {isOpen && (
        <motion.div 
          className='fixed top-0 left-0 bottom-0 bg-black/80 h-screen w-screen content-none' 
          onClick={(e) => handleClickOutside(e)}
          whileInView={{ opacity: [0,1]}}
          transition={{duration: 1}}
          initial = {{ opacity: 0}}
        >
          <div className='flex flex-col items-center pt-14' ref = {content}>
            {children}
          </div>
        </motion.div>
      )}
    </Fragment>
  )
}

export default Popup