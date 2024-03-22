'use client'

import React, { useEffect, useState } from 'react'
import { UserButton, currentUser, SignOutButton  } from '@clerk/nextjs'

import { ClientType } from '@/types'

import MessengerClientChatTile from './MessengerClientChatTile'
import MessengerChatSearch from './MessengerChatSearch'
import { LogOut } from 'lucide-react'

const MessengerChatSideNav = ( { clients } : { clients: ClientType[] }) => {
  const [searchTerm, setSearchTerm] = useState('')  

  const filteredClients = clients.filter((client) => client.clientName.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className = 'h-full flex flex-col px-4 py-2'>
      <div className='py-4 flex items-center gap-2 font-semibold uppercase text-[12px] tracking-[0.05em] justify-between'>
        <div className='flex items-center gap-2'>
          <UserButton afterSignOutUrl='/'/>
          
          {/* {user?.firstName} */}
        </div>

        <div className='flex items-center gap-2'>
          <SignOutButton />

          <LogOut size={15} />
        </div>
      </div>
      <div className='mb-2'>
        <MessengerChatSearch searchTerm = {searchTerm} setSearchTerm = {setSearchTerm} />
      </div>
      <div className='grid grid-cols-1 overflow-auto'>
        {filteredClients?.map((client, i) => (
          <MessengerClientChatTile client={client} key = {i}/>
        ))}
      </div>  
    </div>
  )
}

export default MessengerChatSideNav