import { portalClient } from "@/app/lib/sanity"
import { protect } from "@/middleware/authMiddleware"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: Request){
  try{
    const client = await protect(req)

    if(client){
      const body = await req.json()
  
      const { date } = body

      client.progress.resheduleDate = body.date
      client.progress.isAppliedForResheudle = true

      await portalClient.createOrReplace(client)

      return new NextResponse(
        "Request Sent",
        { status: 200 }
      );
    }
  } catch (error){
    console.log(error)

    return new NextResponse("There was a problem updating your appointment date");
  }
}