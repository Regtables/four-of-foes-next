"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { useSection } from "@/context/PortalSectionContext";

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
  const { currentSection } = useSection();
  const [animateDot, setAnimateDot] = useState({});

  useEffect(() => {
    if (currentSection === "lobby") {
      setAnimateDot({ x: "-28vw" });
    }

    if (currentSection === "lounge") {
      setAnimateDot({ x: "0%" });
    }

    if (currentSection === "wallet") {
      setAnimateDot({ x: "28vw" });
    }
  }, [currentSection]);

  const simulateArrowKeyPress = (arrowKey: any) => {
    const event = new KeyboardEvent("keydown", { key: arrowKey });
    document.dispatchEvent(event);
  };

  const handleLinkClick = (link: string) => {
    const main = document.getElementById('main')

    main?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }))
  }


  return (
    <div className="grid grid-cols-3 gap-8 w-full">
      {LINKS.map((link) => (
        <div
          className="uppercase text-[11px] tracking-[0.2em] flex flex-col items-center justify-center relative"
          // href={`#${link.link}`}
          onClick={() => handleLinkClick(link.link)}
        >
          {link.link}

          {link.link === "lounge" && (
            <motion.div
              className="h-2 w-2 bg-[grey] rounded-full absolute bottom-[-15px]"
              animate={animateDot}
              transition={{ duration: 0.5 }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default PortalNavbar;
