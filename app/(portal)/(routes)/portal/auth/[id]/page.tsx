import { createSession } from '@/app/lib/actions/clients/auth'
import { fetchSanityClient } from '@/app/lib/actions/clients/fetchClient'
import { fetchClient } from '@/app/lib/queries'
import PortalAuth from '@/components/portal/sections/PortalAuth'
import { redirect } from 'next/navigation'
import React from 'react'

const PortalAuthPage: React.FC<any> = async ({ params }) => {
  const { id } = params

  const client = await fetchSanityClient(id)

  if(!client) return redirect('/')

  const handleClientConfirm = async () => {
    await createSession(client)
  }

  return (
    <div className='h-full flex items-center justify-center'>
      <PortalAuth client={client} />
    </div>
  )
}

export default PortalAuthPage