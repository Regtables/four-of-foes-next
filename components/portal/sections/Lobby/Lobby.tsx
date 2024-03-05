'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import SectionLayout from '../../layout/SectionLayout'
import Partition from '../../PortalLinkList/Partition'
import PortalMessenger from '../../messenger/PortalMessenger/PortalMessenger'
import CancelAppointment from '@/components/buttons/CancelAppointment'
import { useSection } from '@/context/PortalSectionContext'
import { MessageType } from '@/types'

interface LobbyProps {
  messages: MessageType[]
}

const Lobby = ({ messages } : LobbyProps) => {
  const { currentSection } = useSection()
  const [animatePage, setAnimatePage] = useState({})

  useEffect(() => {
    const lounge = document.getElementById('lounge')

    lounge?.scrollIntoView()
  }, [])

  useEffect(() => {
    if(currentSection === 'lobby'){
      setAnimatePage({ opacity: [0,1]})
    } else {
      setAnimatePage({ opacity: [1,0]})
    }
  }, [currentSection])
  
  return (
    <SectionLayout section='lobby'>
      <motion.div 
        className='w-full h-full pt-8 flex flex-col' 
        // whileInView={{ opacity: [0,1] }} 
        animate = {animatePage}
        transition={{ duration: 1 }} 
        initial = {{opacity: 0}}
      >
        <div className='flex-[0.02] text-[8px] font-light tracking-[0.1em] uppercase italic text-center pb-3'>
          Here you able to directly communicate with your artist
        </div>

        <Partition />

        <div className='flex-[0.92]'>
          <PortalMessenger messages = {messages} />
        </div>

        <Partition />
      </motion.div>
    </SectionLayout>
  )
}

export default Lobby