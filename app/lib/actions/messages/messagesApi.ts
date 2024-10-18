import axios from "axios";

import { ClientType, Message } from "@/types";

export const readMessages = async (messages: Message[], isAdmin: boolean) => {
  const response = await axios.patch('/api/portal/messenger/read-messages', { messages, isAdmin })

  return response
}

export const archiveClient = async (client: ClientType) => {
  const response = await axios.patch(`/api/portal/messenger/archive-client`, { client })

  return response
}

export const deleteClient = async (client: ClientType) => {
  const respose = await axios.post('/api/portal/messenger/delete-client', { client })

  return respose
}