import React from 'react'

import { fetchActiveClientChats, fetchAllClientChats } from '@/app/lib/actions/clients/fetchClient'

import MessengerChatSideNav from '@/components/portal/messenger/dashboard/MessengerChatSideNav'

export const revalidate = 0

const MessengerDashboardLayout = async ({ children } : { children: React.ReactNode }) => {
  const clientChats = await fetchActiveClientChats()

  return (
    <div className='h-full max-h-screen min-h-full w-full flex border-t-[1px] border-white'>
      <div className='lg:flex-[0.3] min-h-screen flex-[0] border-r-[1px] hidden md:block'>
        <MessengerChatSideNav clients={clientChats} />
      </div>

      <div className='lg:flex-[0.7] w-full h-full lg:block'>
        {children}
      </div>
    </div>
  )
}

export default MessengerDashboardLayout