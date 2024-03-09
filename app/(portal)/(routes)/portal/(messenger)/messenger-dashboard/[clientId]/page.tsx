import React, { Suspense } from 'react'

import MessengerConversation from '@/components/portal/messenger/dashboard/MessengerConversation'
import { fetchClientChat } from '@/app/lib/actions/clients/fetchClient'

const MessengerDashboardConversationPage = async ({ params } : { params: { clientId: string }}) => {
  const { clientId } = params
 
  const clientChat = await fetchClientChat(clientId)
  
  return (
    <div className='h-screen overflow-hidden'>
      <Suspense>
        <MessengerConversation client={clientChat} />
      </Suspense>
    </div>
  )
}

export default MessengerDashboardConversationPage