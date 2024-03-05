import { Search } from 'lucide-react'
import React from 'react'

const MessengerChatSearch = () => {
  return (
    <div className='flex bg-white p-1 px-2 rounded-full gap-2 items-center'>
      <Search color='grey' size = {15} />
      <input className='bg-transparent text-[12px] w-full text-black focus:none border-none outline-none italic' placeholder='Search for a client' />
    </div>
  )
}

export default MessengerChatSearch