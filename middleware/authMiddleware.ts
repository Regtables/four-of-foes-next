'use server'

import { getSession } from "@/app/lib/actions/clients/auth"
import { fetchSanityClient } from "@/app/lib/actions/clients/fetchClient"
import { redirect } from "next/navigation"

import { ClientType, SessionType } from "@/types"

export const protect = async (req: Request)=> {
  try{
    const session = await getSession()
      
    if(!session) return redirect('/portal/auth/unauthorized')
  
    if(session?.expires > new Date(0))  return redirect('/portal/auth/unauthorized')
  
    if(session){
      const client = await fetchSanityClient(session.user.id)

      return client as ClientType
    } 
  } catch (error){
    console.log(error)
  }
} 