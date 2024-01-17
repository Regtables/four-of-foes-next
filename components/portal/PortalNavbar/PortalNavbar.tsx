'use client'

import React, { useEffect, useState } from "react";
import { motion } from 'framer-motion' 

import { useSection } from "@/context/PortalSectionContext";
import Link from "next/link";

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
  const { currentSection } = useSection()
  const [animateDot, setAnimateDot] = useState({ })

  useEffect(() => {
    if(currentSection === 'lobby'){
      setAnimateDot({ x: '-28vw'})
    }

    if(currentSection === 'lounge'){
      setAnimateDot({ x: '0%'})
    }

    if(currentSection === 'wallet'){
      setAnimateDot({ x: '28vw'})
    }

  }, [currentSection])

  return (
    <div className="grid grid-cols-3 gap-8 w-full">
      {LINKS.map((link) => (
        <a className="uppercase text-[11px] tracking-[0.2em] flex flex-col items-center justify-center relative" href={`#${link.link}`}>
          {link.link}

          {link.link === "lounge" && (
            <motion.div 
              className="h-2 w-2 bg-[grey] rounded-full absolute bottom-[-15px]"
              animate = {animateDot} 
              transition={{ duration: 0.5 }}  
            />
          )}
        </a>
      ))}
    </div>
  );
};

export default PortalNavbar;
