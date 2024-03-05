'use client'

import React, { Suspense } from 'react'

import { ClientType } from '@/types'

import MessageInput from '../MessageInput/MessageInput'
import ViewMotionWrapper from '@/components/layout/Motion/ViewMotionWrapper'
import { Calendar, MapPin } from 'lucide-react'
import { format } from 'date-fns'

const MessengerConversation = ({ client } : { client: ClientType }) => {
  return (
    <ViewMotionWrapper y = {0} duration={0.3} className='flex flex-col h-full'>
      <Suspense>
        <div className='border-b-[1px] border-white p-2 flex flex-col'>
          <div className='uppercase text-[16px] font-semibold tracking-wider mb-1'>
            {client.clientName}
          </div>

          <div className='flex text-[9px] items-center gap-1 mb-[2px] font-light tracking-wide'>
            <MapPin size={12} />
            {client.appointmentDetails?.appointmentLocation}, {client.appointmentDetails.appointmentCity}
          </div>

          <div className='flex text-[9px] items-center gap-1 font-light tracking-wide'>
            <Calendar size={12} />
            {format(new Date(client.appointmentDetails.appointmentDate), 'dd MMMM yyyy')}
          </div>

        </div>
      </Suspense>

      {/* Use fallback */}
      <Suspense>
        <div className='flex-grow'>

        </div>
      </Suspense>

      <Suspense>
        <div className='p-2 pb-4'>
          <MessageInput />
        </div>
      </Suspense>
    </ViewMotionWrapper>
  )
}

export default MessengerConversation