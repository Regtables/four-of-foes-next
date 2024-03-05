import React from 'react'

import { fetchAllClientChats } from '@/app/lib/actions/clients/fetchClient'
import MessengerChatSideNav from '@/components/portal/messenger/dashboard/MessengerChatSideNav'

const MessengerDashboardLayout = async ({ children } : { children: React.ReactNode }) => {
  const clientChats = await fetchAllClientChats()

  return (
    <div className='h-screen max-h-screen w-full flex m-4'>
      <div className='flex-[0.3] border-r-[1px]'>
        <MessengerChatSideNav clients={clientChats} />
      </div>

      <div className='flex-[0.7] overflow-hidden'>
        {children}
      </div>
    </div>
  )
}

export default MessengerDashboardLayout