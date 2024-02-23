import React from "react";
import Image from "next/image";

const PortalRootLayout = ({ children } : { children: React.ReactNode }) => {
  return (
    <div className="min-h-[100vh] h-screen overflow-y-hidden flex flex-col">
      <header className="flex justify-center items-center flex-[0.05] z-10 relative w-[160px] mx-auto">
        <Image
          src="/logo-big.jpeg"
          fill
          alt="four of foes logo"
          className="object-cover"
        />
      </header>

      <main className="flex-[0.87]">
        {children}
      </main>
    </div>
  );
};

export default PortalRootLayout;
