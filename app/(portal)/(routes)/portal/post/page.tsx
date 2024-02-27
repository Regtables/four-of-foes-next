import React from 'react'

import { LoungeLinkType } from '@/types';

import PortalLinkList from '@/components/portal/PortalLinkList/PortalLinkList';
import { fetchAftercareContent } from '@/app/lib/actions/content/fetchContent';
import { Asterisk } from 'lucide-react';
import PostAppointment from '@/components/portal/sections/PostAppointment/PostAppointment';

const PostPortalPage = async () => {
  const aftercontent = fetchAftercareContent()

  const [aftercareData] = await Promise.all([aftercontent])

  const LINKS: LoungeLinkType[] = [
    {
      link: "aftercare",
      type: 'aftercare',
      data: aftercareData
    },
    {
      link: "your photos",
      type: 'photos',
      data: {}
    },
    {
      link: "feedback",
      type: 'feedback',
      data: {}
    },
  ];

  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      <PostAppointment data = {LINKS} />
    </div>
  )
}
export default PostPortalPage
