import { MessageType } from '@/types'
import React from 'react'
import Messages from '../Messages/Messages'
import MessageInput from '../MessageInput/MessageInput'

const PortalMessenger = ({ messages } : { messages: MessageType[] }) => {
  return (
    <div className='flex flex-col h-full w-full py-4 px-2'>
      <div className='flex-[0.95] w-full'>
        <Messages messages={messages} />
      </div>

      <div className='flex-[0.05]'>
        <MessageInput />
      </div>
    </div>
  )
}

export default PortalMessenger