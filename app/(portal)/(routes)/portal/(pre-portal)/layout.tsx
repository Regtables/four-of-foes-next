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
      <div className="min-h-[100vh] h-screen overflow-y-hidden flex flex-col">
        <header className="flex justify-center items-center flex-[0.05] z-10 relative w-[160px] mx-auto">
          <Image src = '/logo-big.jpeg' fill alt = 'four of foes logo' className="object-cover"/>
        </header>

        <main className="flex-[0.87]">
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
