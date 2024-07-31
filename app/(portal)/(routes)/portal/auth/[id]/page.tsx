import React from 'react'

import { fetchSanityClient } from '@/app/lib/actions/clients/fetchClient'

import PortalAuth from '@/components/portal/sections/PortalAuth'
import { getVerificationToken } from '@/app/lib/actions/clients/auth'

export const cache = 'no-store'

const PortalAuthPage: React.FC<any> = async ({ params }) => {
  const { id } = params

  const client = await fetchSanityClient(id)

  console.log(client)
  const verification = await getVerificationToken()

  const isVerified = client?.email === verification?.user.email

  return (
    <div className='h-full flex items-center justify-center'>
      <PortalAuth client={client} isVerified = {isVerified} />
    </div>
  )
}

export default PortalAuthPage