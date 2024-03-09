'use server'

import { getSession } from "@/app/lib/actions/clients/auth"
import { fetchSanityClient } from "@/app/lib/actions/clients/fetchClient"
import { redirect } from "next/navigation"

import { ClientType, SessionType } from "@/types"
import { NextRequest, NextResponse } from "next/server"

export const protect = async (req: Request)=> {
  try{
    const session:any = await getSession()
      
    if(!session) return redirect('/portal/auth/unauthorized')
  
    if(session?.expires > new Date(0))  return redirect('/portal/auth/unauthorized')
  
    if(session){
      const client = await fetchSanityClient(session.user.id)
      
      return client as ClientType
    } 
  } catch (error){
    console.log(error)
  }
  // try {
  //   const session:any = await getSession(req);
    
  //   if (!session) {
  //     return new NextResponse(null, { status: 401 });
  //   }
  
  //   const client = await fetchSanityClient(session.user.id)
    
  //   // Attach the client data to the request object
  //   const clonedReq = req.clone();
  //   clonedReq.headers.set("x-client", JSON.stringify(client));
  
  //   return NextResponse.next({
  //     request: clonedReq,
  //   });
  // } catch (error) {
  //   console.error("Error in authMiddleware:", error);
  //   return new NextResponse(null, { status: 500 });
  // }
} 
