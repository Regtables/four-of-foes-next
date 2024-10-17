import { PortalSectionProvider } from "@/context/PortalSectionContext";
import Image from "next/image";
import { Metadata } from "next/types";
import React from "react";
import { redirect } from "next/navigation";

import PortalNavbar from "@/components/portal/PortalNavbar/PortalNavbar";
import { getSession } from "@/app/lib/actions/clients/auth";
import { fetchClientChat, fetchSanityClient } from "@/app/lib/actions/clients/fetchClient";
import { filterUnreadMessages } from "@/app/lib/helpers";

export const metadata: Metadata = {
  title: "Four of Foes - Patron Lounge",
  description: "The coolest tattoo website ever made",
};

const PortalLayout = async ({ children }: { children: React.ReactNode }) => {
  const session: any = await getSession();
  if (!session) redirect("/portal/auth/unauthorized");

  const clientData = await fetchSanityClient(session!.user.id);
  
  if(clientData.progress.isTattooCompleted){
    redirect('/portal/post')
  }
  
  const clientChat = await fetchClientChat(session?.user?.id)
  const unreadMessages = filterUnreadMessages(clientChat.chat, false)

  return (
    <PortalSectionProvider>
      <div className="flex flex-col h-full flex-[0.95]">
        {children}

        <footer className="flex items-center w-72 mx-auto">
          <PortalNavbar unreadMessages = {unreadMessages} />
        </footer>
      </div>
    </PortalSectionProvider>
  );
};

export default PortalLayout;
