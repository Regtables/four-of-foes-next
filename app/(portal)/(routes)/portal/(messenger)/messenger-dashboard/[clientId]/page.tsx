import React, { Suspense } from "react";

import MessengerConversation from "@/components/portal/messenger/dashboard/MessengerConversation";
import {
  fetchClientChat,
  fetchSanityClient,
} from "@/app/lib/actions/clients/fetchClient";
import { MessengerProvider } from "@/context/MessengerContext";

const MessengerDashboardConversationPage = async ({
  params,
}: {
  params: { clientId: string };
}) => {
  const { clientId } = params;

  const client = await fetchSanityClient(clientId);
  const clientChat = await fetchClientChat(clientId);

  const messageHistory = clientChat.chat ? clientChat.chat : [];

  return (
    <div className="">
      <Suspense>
        <MessengerProvider
          messageHistory={messageHistory}
          client={client}
          isAdmin
        >
          <MessengerConversation client={client} />
        </MessengerProvider>
      </Suspense>
    </div>
  );
};

export default MessengerDashboardConversationPage;
