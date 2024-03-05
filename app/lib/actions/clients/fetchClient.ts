'use server'

import { allClientChatsQuery, clientChatQuery, clientQuery, fetchClient } from "../../queries"
import { portalClient } from "../../sanity"

export const fetchSanityClient = async (id: string) => {
  try{
    const clientData = await portalClient.fetch(clientQuery(id))

    return clientData[0]
  } catch (error) {
    console.log(error)

    return error
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