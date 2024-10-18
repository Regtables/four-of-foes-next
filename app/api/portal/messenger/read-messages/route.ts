import { portalClient } from "@/app/lib/sanity"
import { Message } from "@/types"
import { NextResponse } from "next/server"

export async function PATCH(request: Request){
  const { messages, isAdmin } = await request.json()
 
  try{
    for(let i = 0; i<messages.length;i++){
      const message = messages[i]

      if(isAdmin){
        if(!message.readBy.includes('admin')){
          message.readBy.push('admin')
        }
      } else {
        if(!message.readBy.includes('client')){
          message.readBy.push('client')
        }
      }

      await portalClient.patch(message._id).set({ readBy: message.readBy }).commit()
    }

    return NextResponse.json('Messages read' , { status: 200 })
  } catch (error){
    console.log(error)

    return NextResponse.json({ error: `There was a problem when reading all messages: ${error}`}, { status: 500 })
  }
}