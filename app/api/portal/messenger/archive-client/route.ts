import { portalClient } from "@/app/lib/sanity";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async(req: NextRequest) => {
  try{
    const { client } = await req.json()

    if(client){
      await portalClient.patch(client._id).set({ isActive: false }).commit()

      return NextResponse.json('client archived', { status: 200 })
    } else {
      console.log('no client')
    }
  } catch (error){
    console.log(error)
    
    return NextResponse.json({ error: `Error while archiving client: ${error}`}, { status: 500 })
  }
}