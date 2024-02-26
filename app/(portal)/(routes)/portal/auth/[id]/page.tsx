import { fetchSanityClient } from '@/app/lib/actions/clients/fetchClient'
import { fetchClient } from '@/app/lib/queries'
import PortalAuth from '@/components/portal/sections/PortalAuth'
import { redirect } from 'next/navigation'
import React from 'react'

const PortalAuthPage = async ({ params }) => {
  const { id } = params

  const client = await fetchSanityClient(id)

  if(!client) return redirect('/')

  const handleClick = () => {
    
  }

  return (
    <div className='h-full flex items-center justify-center'>
      <PortalAuth />
    </div>
  )
}

export default PortalAuthPage