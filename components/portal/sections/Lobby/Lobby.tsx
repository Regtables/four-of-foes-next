'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { useSection } from '@/context/PortalSectionContext'
import { ClientType, Message } from '@/types'
import { usePortalProgress } from '@/context/PortalProgressContext'
import { useModal } from '@/context/ModalContext'
import { MessengerProvider } from '@/context/MessengerContext'

import SectionLayout from '../../layout/SectionLayout'
import Partition from '../../PortalLinkList/Partition'
import PortalMessenger from '../../messenger/PortalMessenger'
import ButtonPill from '@/components/buttons/ButtonPill'

interface LobbyProps {
  messages: Message[],
  client: ClientType
}

const Lobby = ({ messages, client } : LobbyProps) => {
  const { currentSection } = useSection()
  const [animatePage, setAnimatePage] = useState({})
  const { progress } = usePortalProgress()
  const { handleModalOpen } = useModal() 
  const [ isRestricted, setIsRestricted] = useState(false)

  useEffect(() => {
    const lounge = document.getElementById('lounge')

    lounge?.scrollIntoView({behavior: 'instant'})
  }, [])

  useEffect(() => {
    if(!progress.isDepositConfirmed){
      setIsRestricted(true)
    } else {
      setIsRestricted(false)
    }
  }, [progress])

  useEffect(() => {
    if(currentSection === 'lobby'){
      setAnimatePage({ opacity: [0,1]})
    } else {
      setAnimatePage({ opacity: [1,0]})
    }
  }, [currentSection])
  
  return (
    <SectionLayout section='lobby'>
      <AnimatePresence>
        {currentSection === 'lobby' && (
          <motion.div 
            className='w-full h-full max-h-full pt-8 flex flex-col relative lg:w-[70vw]' 
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { opacity: 0, y: 0 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 1
                },
              },
              exit: {
                opacity: 0,
                // y: [0, -20],
                transition: {
                  duration: 0
                },
              },}}
          >
            <div className='flex-[0.02] text-[8px] font-light tracking-[0.1em] uppercase italic text-center pb-3'>
              Here you able to directly communicate with your artist
            </div>

            <Partition />

            <div className='flex-[0.92] max-h-full'>
              <MessengerProvider messageHistory = {messages} client = {client} isAdmin = {false}>
                <PortalMessenger />
              </MessengerProvider>
            </div>

            <Partition />
          </motion.div>
        )}
      </AnimatePresence>

      {isRestricted && (
        <div className='absolute start-0 right-0 top-0 bottom-0 bg-black/80 z-10 h-full max-h-screen w-screen flex flex-col justify-center items-center gap-4'>
          <div className='flex flex-col justify-center items-center gap-4 mb-14'>
            <div className='text-[12px] text-center paragraph w-[70%]'>The lobby is restricted to patrons who have paid their deposit. Please pay your deposit in order to enter the Lobby</div>
            <a className='w-[120px]' href='/portal/pre#wallet'>
              <ButtonPill fill text='go to wallet'/>
            </a>
          </div>
        </div>
      )}
    </SectionLayout>
  )
}

export default Lobby