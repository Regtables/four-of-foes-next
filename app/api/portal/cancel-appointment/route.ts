import { portalClient } from "@/app/lib/sanity"
import { protect } from "@/middleware/authMiddleware"
import { NextResponse } from "next/server"

export async function POST(req: Request){
  try{
    const client = await protect(req)

    if(client){
      if(!client.progress.isAppliedForCancelation){
        client.progress.isAppliedForCancelation = true

        await portalClient.createOrReplace(client)

        return new NextResponse('Request sent', { status: 200 })
      }
    }
  } catch (error: any){
    return new NextResponse(error, { status: 500 })
  }
}