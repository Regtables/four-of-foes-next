import { createSession, decrypt } from "@/app/lib/actions/clients/auth";
import { fetchSanityClient } from "@/app/lib/actions/clients/fetchClient";
import { redirect } from "next/dist/server/api-utils";
import { cookies } from "next/headers";import { NextResponse } from "next/server";


export async function GET(req: Request){
  try{
    const refresh = cookies().get('session-refresh')?.value

    if(!refresh) return new NextResponse('No refresh token', { status: 401 })

    const decoded = await decrypt(refresh!)

    if(!decoded) return

    if(decoded){
      const client = await fetchSanityClient(decoded.user.id)

      await createSession(client)

      return new NextResponse('Session refreshed', { status: 200 })
    }

  } catch (error){
    console.log(error)

    return new NextResponse('Internal Error', { status: 500 })
  }
}