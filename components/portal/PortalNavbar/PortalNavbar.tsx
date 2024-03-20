"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { useSection } from "@/context/PortalSectionContext";

const LINKS = [{ link: "lobby" }, { link: "lounge" }, { link: "wallet" }];

const PortalNavbar = () => {
  const { currentSection } = useSection();
  const [animateDot, setAnimateDot] = useState({});
  const linkRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const activeLinkIndex = LINKS.findIndex(
      (link) => link.link === currentSection
    );
    if (activeLinkIndex !== -1) {
      const activeLinkWrapper = linkRefs.current[activeLinkIndex];
      const { left, width } = activeLinkWrapper!.getBoundingClientRect();
      const containerLeft =
        activeLinkWrapper!.parentElement!.getBoundingClientRect().left;
      const dotLeft = left - containerLeft + width / 2 - 5;
      setAnimateDot({ left: dotLeft });
    }
  }, [currentSection]);

  return (
    <div className="grid grid-cols-3 gap-8 w-full h-full relative">
      {LINKS.map((link, i) => (
        <div
          className="link-wrapper"
          ref={(el) => (linkRefs.current[i] = el)}
          key={i}
        >
          <a
            className="uppercase text-[11px] tracking-[0.2em] flex flex-col items-center justify-center relative"
            href={`#${link.link}`}
          >
            {link.link}
          </a>

          <motion.div
            className="h-2 w-2 bg-[grey] rounded-full absolute bottom-[-15px] mr-[1px]"
            animate={animateDot}
            transition={{ duration: 0.5 }}
          />
        </div>
      ))}
    </div>
  );
};

export default PortalNavbar;
