'use client'

import React from 'react'

import { ClientType } from '@/types'

import MessengerClientChatTile from './MessengerClientChatTile'
import MessengerChatSearch from './MessengerChatSearch'

const MessengerChatSideNav = ( { clients } : { clients: ClientType[] }) => {
  return (
    <div className = 'overflow-y-scroll h-full grid grid-cols-1 p-4'>
      <div className='p-2'>
        <MessengerChatSearch />
      </div>
      <div className='grid grid-cols-1'>
        {clients?.map((client, i) => (
          <MessengerClientChatTile client={client}/>
        ))}
      </div>  
    </div>
  )
}

export default MessengerChatSideNav