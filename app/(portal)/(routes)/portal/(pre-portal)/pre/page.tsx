import React, { Suspense } from "react";

import {
  fetchIndemnityContent,
  fetchPrepContent,
} from "@/app/lib/actions/content/fetchContent";
import { getSession } from "@/app/lib/actions/clients/auth";
import { fetchClientChat, fetchSanityClient } from "@/app/lib/actions/clients/fetchClient";

import Lobby from "@/components/portal/sections/Lobby/Lobby";
import Lounge from "@/components/portal/sections/Lounge/Lounge";
import Wallet from "@/components/portal/sections/Wallet/Wallet";

export const revalidate = 0

const PortalPage = async () => {
  const session: any = await getSession();

  const prepContent = fetchPrepContent();
  const indemnityContent = fetchIndemnityContent(session!.user.id);
  const clientData = fetchSanityClient(session!.user.id);
  const clientChatData = fetchClientChat(session!.user.id)
  
  const [prepData, indemnityData, client, clientChat] = await Promise.all([
    prepContent,
    indemnityContent,
    clientData,
    clientChatData
  ]);

  const messageHistory = clientChat.chat ? clientChat.chat : []

  const messages = [
    {
      _id: "1",
      isFromClient: false,
      createdAt: new Date(),
      content: "Please use this space to discuss changes and addisional ideas. Here you may also recieve designs. Please use it respectfully and trust the process.",
    },
    ...messageHistory,
  ];

  return (
    <div className="container flex-[0.95]" id="main">
      <div className="page">
        {/* <Suspense> */}
        <Lobby client={client} messages={messages} />
        {/* </Suspense> */}
      </div>

      <div className="page" id="lounge">
        {/* <Suspense> */}
        <Lounge
          indemnityData={indemnityData}
          prepData={prepData}
          appointmentData={client.appointmentDetails}
        />
        {/* </Suspense> */}
      </div>

      <div className="page" id="wallet">
        {/* <Suspense> */}
        <Wallet client={client} />
        {/* </Suspense> */}
      </div>
    </div>
  );
};

export default PortalPage;
