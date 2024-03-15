import { NextResponse } from "next/server"

import { portalClient } from "@/app/lib/sanity"
import { protect } from "@/middleware/authMiddleware"
import { Message } from "@/types"

export async function POST(req: Request){
  try{
    const { content } = await req.json()
    const client = await protect(req)

    if(client){
      const message = {
        _type: 'message',
        content,
        createdAt: new Date(),
        sender: {
          _type: 'reference',
          _ref: client._id
        },
        isSent: true,
        hasError: false,
        isFromClient: true,
        _key: new Date(),
        readBy: [{ _type: 'reference', _ref: client._id }]
      }

      const newMessage = await portalClient.create(message)

      const newMessageRef = {
        _type: 'reference',
        _ref: newMessage._id,
        _key: client.chat.length + 1
      }

      await portalClient.patch(client._id).setIfMissing({ chat: [] }).append('chat', [newMessageRef]).commit()

      console.log(newMessage)

      return NextResponse.json({ message }, { status: 200 })
    }
  } catch (error){
    console.log(error)

    return NextResponse.json(`Error sending message: ${error}`, { status: 500 })
  }
}