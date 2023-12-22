import React from 'react'
import SectionLayout from '../../layout/SectionLayout'
import Partition from '../../PortalLinkList/Partition'
import PortalMessenger from '../../messenger/PortalMessenger/PortalMessenger'

const MESSAGES = [
  {
    _id: '1',
    content: 'Please use this space to discuss changes and addisional ideas. Here you may also recieve designs. Please use it respectfully and trust the process.',
    sender: 'Admin',
    isRead: false,
    isDeleted: false,
    isClient: false,
    isImage: false,
    date: new Date()
  },
  {
    _id: '2',
    content: "Yay I'm so excited",
    sender: 'Reg',
    isRead: false,
    isDeleted: false,
    isClient: true,
    isImage: false,
    date: new Date()
  }
]

const Lobby = () => {
  return (
    <SectionLayout>
      <div className='w-full h-full pt-8 flex flex-col'>
        <div className='flex-[0.02] text-[8px] font-light tracking-[0.1em] uppercase italic text-center pb-3'>
          Here you able to directly communicate with your artist
        </div>

        <Partition />

        <div className='flex-[0.92]'>
          <PortalMessenger messages = {MESSAGES} />
        </div>

        <Partition />
        <div className='flex-[0.05] h-full'>
          <button className='h-full flex items-center justify-center w-full text-[7px] uppercase tracking-[0.4em] text-[#a9a9a9]'>
            cancel/resheudle
          </button>
        </div>
      </div>
    </SectionLayout>
  )
}

export default Lobby