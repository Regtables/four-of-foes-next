import React from 'react'

import { fetchAllClientChats } from '@/app/lib/actions/clients/fetchClient'

import MessengerChatSideNav from '@/components/portal/messenger/dashboard/MessengerChatSideNav'

const MessengerDashboardPage = async () => {
  const clientChats = await fetchAllClientChats()

  return (
    <div className='h-full max-h-screen w-full flex border-t-[1px] border-white'>
      <div className='lg:flex-[0.3] flex-grow border-r-[1px]'>
        <MessengerChatSideNav clients={clientChats} />
      </div>

      <div className='flex-[0.7] h-full overflow-hidden hidden uppercase lg:flex justify-center items-center tracking-[0.2em] text-[12px]'>
        please choose a chat to get started
      </div>
    </div>
  )
}

export default MessengerDashboardPage