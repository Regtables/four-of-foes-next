import { PortalSectionProvider } from "@/context/PortalSectionContext";
import Image from "next/image";
import { Metadata } from "next/types";
import React from "react";
import { redirect } from "next/navigation";

import PortalNavbar from "@/components/portal/PortalNavbar/PortalNavbar";
import { getSession } from "@/app/lib/actions/clients/auth";

export const metadata: Metadata = {
  title: "Four of Foes - Patron Lounge",
  description: "The coolest tattoo website ever made",
};

const PortalLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();

  if (!session) redirect("/portal/auth/unauthorized");

  // if(session.user?.isAppointmentCompleted) redirect('/portal/post')

  return (
    <PortalSectionProvider>
      <div className="flex flex-col h-full">
        {children}

        <footer className="flex items-center w-72 mx-auto">
          <PortalNavbar />
        </footer>
      </div>
    </PortalSectionProvider>
  );
};

export default PortalLayout;
