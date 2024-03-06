import React from "react";

import { PortalProgressProvider } from "@/context/PortalProgressContext";

export const revalidate = 1

const PortalRootLayout = async ({ children } : { children: React.ReactNode }) => {
  return (
    <PortalProgressProvider>
      <div className="min-h-[100vh] w-[100vw] h-screen flex flex-col">
        <header className="flex justify-center items-center flex-[0.05] z-10 relative w-[160px] mx-auto">
          {/* <Image
            src="/logo-big.jpeg"
            fill
            alt="four of foes logo"
            className="object-cover"
          /> */}
          <h1 className="uppercase tracking-wider font-[300] heading-font">Four of Foes</h1>
        </header>

        <main className="flex-[0.9]">
          {children}
        </main>
      </div>
    </PortalProgressProvider>
  );
};

export default PortalRootLayout;
