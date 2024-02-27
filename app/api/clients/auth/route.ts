import { createSession } from "@/app/lib/actions/clients/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json()

  const { client } = body

  try{
    if(client){
      await createSession(client)

      return NextResponse.redirect(new URL('/portal', req.url))
    }
  } catch (error){
    console.log(error)

    throw error
  }
}