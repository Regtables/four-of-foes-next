import { NextResponse } from "next/server"

import { deleteSession } from "@/app/lib/actions/clients/auth"

export async function GET(req: Request){
  try{
    await deleteSession()

    return new NextResponse('User logged out', { status: 200 })
  } catch (error){
    console.log(error)

    return new NextResponse('Internal Error', { status: 500 })
  }
}