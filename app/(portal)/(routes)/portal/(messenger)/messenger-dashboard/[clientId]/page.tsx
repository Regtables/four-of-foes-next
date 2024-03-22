import React, { Suspense } from "react";

import {
  fetchClientChat,
  fetchSanityClient,
} from "@/app/lib/actions/clients/fetchClient";
import { MessengerProvider } from "@/context/MessengerContext";

import MessengerConversation from "@/components/portal/messenger/dashboard/MessengerConversation";
import axios from "axios";

export const revalidate = 0

const MessengerDashboardConversationPage = async ({
  params,
}: {
  params: { clientId: string };
}) => {
  const { clientId } = params;

  const clientData = fetchSanityClient(clientId);
  const clientChatData = fetchClientChat(clientId);

  const [client, clientChat] = await Promise.all([clientData, clientChatData])

  console.log(clientChat)

  // const res =await axios.delete('/api/portal/messenger/delete-messages')

  // console.log(res)

  const messageHistory = clientChat.chat ? clientChat.chat : [];

  return (
    <div>
      {/* <Suspense> */}
        <MessengerProvider
          messageHistory={messageHistory}
          client={client}
          isAdmin
        >
          <MessengerConversation client={client} />
        </MessengerProvider>
      {/* </Suspense> */}
    </div>
  );
};

export default MessengerDashboardConversationPage;
