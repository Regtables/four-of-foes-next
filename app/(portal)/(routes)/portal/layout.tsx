import React from "react";

import { PortalProgressProvider } from "@/context/PortalProgressContext";

export const revalidate = 0

const PortalRootLayout = async ({ children } : { children: React.ReactNode }) => {
  return (
    <PortalProgressProvider>
      <div className="min-h-[100vh] w-[100vw] h-screen max-h-screen overflow-hidden flex flex-col">
        <header className="flex justify-center items-center flex-[0.05] z-10 relative w-[160px] mx-auto">
          <h1 className="uppercase tracking-wider font-[300] heading-font">Four of Foes</h1>
        </header>

        {/* <main className="flex-[0.95]"> */}
          {children}
        {/* </main> */}
      </div>
    </PortalProgressProvider>
  );
};

export default PortalRootLayout;
