import React, { Suspense } from 'react'

import Lobby from '@/components/portal/sections/Lobby/Lobby'
import Lounge from '@/components/portal/sections/Lounge/Lounge'
import Wallet from '@/components/portal/sections/Wallet/Wallet'

const PortalPage = () => {
  return (
    <div className='container'>
      <div className='page'>
        <Suspense>
          <Lobby />
        </Suspense>
      </div>

      <div className='page'>
        <Suspense>
          <Lounge />
        </Suspense>
      </div>

      <div className='page'>
        <Suspense>
          <Wallet />
        </Suspense>
      </div>
    </div>
  )
}

export default PortalPage