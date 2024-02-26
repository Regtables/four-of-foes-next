import { PortalSectionProvider } from "@/context/PortalSectionContext";
import Image from "next/image";
import { Metadata } from "next/types";
import React from "react";

import PortalNavbar from "@/components/portal/PortalNavbar/PortalNavbar";

export const metadata: Metadata = {
  title: 'Four of Foes - Patron Lounge',
  description: 'The coolest tattoo website ever made',
}

const PortalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <PortalSectionProvider>
      <div className="flex flex-col h-full">
        <main className="h-full">
          {children}
        </main>

        <footer className="flex-[0.05] flex items-center w-72 mx-auto">
          <PortalNavbar />
        </footer>
      </div>
    </PortalSectionProvider>
  );
};

export default PortalLayout;
