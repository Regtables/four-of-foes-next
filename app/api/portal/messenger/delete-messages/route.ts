import { portalClient } from "@/app/lib/sanity";
import { error } from "console";
import { NextResponse } from "next/server";

export async function DELETE(request: Request){
  try{

    await portalClient.patch('1e88dd08-65f1-45e0-9f8f-3d7e77b5103b').set({ chat: [] }).commit()
    // await portalClient.delete({ query: '*[_type == "message"][0...10]'})

    return NextResponse.json('Messages deleted', { status: 200 })
  } catch (error){
    console.log(error)

    return NextResponse.json('Error when deleting messages', { status: 500 })
  }
}