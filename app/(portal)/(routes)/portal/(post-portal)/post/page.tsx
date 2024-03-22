import React from 'react'
import { redirect } from 'next/navigation';

import { fetchAftercareContent } from '@/app/lib/actions/content/fetchContent';
import { getSession } from '@/app/lib/actions/clients/auth';
import { fetchSanityClient } from '@/app/lib/actions/clients/fetchClient';

import PostAppointment from '@/components/portal/sections/PostAppointment/PostAppointment';
import { SessionType } from '@/types';

const PostPortalPage = async () => {
  const session: any = await getSession()

  // if(!session?.user.isAppointmentCompleted) return redirect('/portal/pre')

  const aftercontent = fetchAftercareContent()
  const client = fetchSanityClient(session?.user.id!)

  const [aftercareData, clientData] = await Promise.all([aftercontent, client])

  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      <PostAppointment aftercareData={aftercareData} client={clientData} />
    </div>
  )
}
export default PostPortalPage
