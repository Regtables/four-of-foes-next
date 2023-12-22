import React from "react";

const LINKS = [
  {
    link: "lobby",
  },
  {
    link: "lounge",
  },
  {
    link: "wallet",
  },
];

const PortalNavbar = () => {
  return (
    <div className="grid grid-cols-3 gap-8 w-full">
      {LINKS.map((link) => (
        <div className="uppercase text-[11px] tracking-[0.2em] flex flex-col items-center justify-center relative">
          {link.link}

          {link.link === "lounge" && (
            <div className="h-2 w-2 bg-[grey] rounded-full absolute bottom-[-15px]" />
          )}
        </div>
      ))}
    </div>
  );
};

export default PortalNavbar;
