import React, { Suspense } from 'react'

import Lobby from '@/components/portal/sections/Lobby/Lobby'
import Lounge from '@/components/portal/sections/Lounge/Lounge'
import Wallet from '@/components/portal/sections/Wallet/Wallet'
import { fetchIndemnityContent, fetchPrepContent } from '@/app/lib/actions/content/fetchContent'
import { IndemnityType } from '@/types'
import { getSession } from '@/app/lib/actions/clients/auth'
import { fetchSanityClient } from '@/app/lib/actions/clients/fetchClient'

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
    content: "I'm very excited",
    sender: 'Reg',
    isRead: false,
    isDeleted: false,
    isClient: true,
    isImage: false,
    date: new Date()
  }
]

const PortalPage = async () => {
  const session = await getSession() 
  const prepContent = fetchPrepContent()
  const indemnityContent = fetchIndemnityContent()
  const client = await fetchSanityClient(session!.user.id)

  const [prepData, indemnityData] = await Promise.all([prepContent, indemnityContent])

  
  return (
    <div className='container' id = 'main'>
      <div className='page'>
        {/* <Suspense> */}
          <Lobby messages={MESSAGES} />
        {/* </Suspense> */}
      </div>

      <div className='page'>
        {/* <Suspense> */}
          <Lounge indemnityData={indemnityData} prepData={prepData} appointmentData={client.appointmentDetails} />
        {/* </Suspense> */}
      </div>

      <div className='page'>
        {/* <Suspense> */}
          <Wallet />
        {/* </Suspense> */}
      </div>
    </div>
  )
}

export default PortalPage