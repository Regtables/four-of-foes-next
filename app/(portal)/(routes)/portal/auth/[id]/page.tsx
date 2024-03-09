import { redirect } from 'next/navigation'
import React from 'react'

import { fetchSanityClient } from '@/app/lib/actions/clients/fetchClient'

import PortalAuth from '@/components/portal/sections/PortalAuth'

const PortalAuthPage: React.FC<any> = async ({ params }) => {
  const { id } = params

  const client = await fetchSanityClient(id)

  if(!client) return redirect('/')

  return (
    <div className='h-full flex items-center justify-center'>
      <PortalAuth client={client} />
    </div>
  )
}

export default PortalAuthPage