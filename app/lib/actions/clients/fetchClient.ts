'use server'

import { allClientChatsQuery, clientChatQuery, clientQuery, fetchClient } from "../../queries"
import { portalClient } from "../../sanity"

export const fetchSanityClient = async (id: string) => {
  try{
    const clientData = await portalClient.fetch(clientQuery(id))

    if(clientData){
      return clientData[0]
    } else {
      throw new Error('Client was not found')
    }
  } catch (error) {
    console.log(error)

    throw error
  }
}

export const fetchAllClientChats = async () => {
  const clientChatsData = await portalClient.fetch(allClientChatsQuery())

  return clientChatsData
}

export const fetchClientChat = async (clientId: string) => {
  const clientChat = await portalClient.fetch(clientChatQuery(clientId))

  return clientChat[0]
}