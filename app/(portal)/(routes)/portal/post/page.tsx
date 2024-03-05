import React from 'react'

import { LoungeLinkType } from '@/types';

import PortalLinkList from '@/components/portal/PortalLinkList/PortalLinkList';
import { fetchAftercareContent } from '@/app/lib/actions/content/fetchContent';
import { Asterisk } from 'lucide-react';
import PostAppointment from '@/components/portal/sections/PostAppointment/PostAppointment';
import { getSession } from '@/app/lib/actions/clients/auth';
import { fetchSanityClient } from '@/app/lib/actions/clients/fetchClient';

const PostPortalPage = async () => {
  const session = await getSession()
  const aftercontent = fetchAftercareContent()
  const client = fetchSanityClient(session?.user.id!)

  const [aftercareData, clientData] = await Promise.all([aftercontent, client])

  const LINKS: LoungeLinkType[] = [
    {
      link: "aftercare",
      type: 'aftercare',
      data: aftercareData
    },
    {
      link: "your photos",
      type: 'photos',
      data: clientData.tattooImages
    },
    {
      link: "feedback",
      type: 'feedback',
      data: {}
    },
  ];

  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      <PostAppointment aftercareData={aftercareData} client={clientData} />
    </div>
  )
}
export default PostPortalPage
