import React from 'react'

import { fetchAftercareContent } from '@/app/lib/actions/content/fetchContent';
import { getSession } from '@/app/lib/actions/clients/auth';
import { fetchSanityClient } from '@/app/lib/actions/clients/fetchClient';

import PostAppointment from '@/components/portal/sections/PostAppointment/PostAppointment';
import { testClient } from '@/app/lib/utils';

const PostPortalPage = async () => {
  const session: any = await getSession()

  const aftercontent = fetchAftercareContent()


  const [aftercareData] = await Promise.all([aftercontent])

  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      <PostAppointment aftercareData={aftercareData} client={testClient} />
    </div>
  )
}
export default PostPortalPage
