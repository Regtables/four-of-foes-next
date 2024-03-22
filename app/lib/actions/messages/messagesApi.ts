import axios from "axios";

import { Message } from "@/types";

export const readMessages = async (messages: Message[], isAdmin: boolean) => {
  const response = await axios.patch('/api/portal/messenger/read-messages', { messages, isAdmin })

  return response
}