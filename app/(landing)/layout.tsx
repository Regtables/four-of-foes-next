"use client";
import React, { useRef, useState } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";

import NavIcon from "@/components/navigation/NavIcon";
import NavMenu from "@/components/navigation/NavMenu";
import ViewMotionWrapper from "@/components/layout/Motion/ViewMotionWrapper";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  const [toggleNavMenu, setToggleNavMenu] = useState(false);
  const nav:any = useRef(null)

  const navMenuVariants = {
    visible: {
      x: 0,
    },
    hidden: {
      x: -500,
    },
  };

  const handleNavIconClick = () => {
    setToggleNavMenu((prev) => !prev);
  };

  const handleMainClick = (e: any) => {
    if(nav.current && !nav.current.contains(e.target) && toggleNavMenu){
      setToggleNavMenu(false)
    }
  }

  return (
      <div>
        <nav ref = {nav}>
          <ViewMotionWrapper x = {-10} y= {0} duration={1}>
          <div
            onClick={handleNavIconClick}
            className="fixed z-30 top-10 start-5 cursor-pointer"
          >
            {toggleNavMenu ? <X className="opacity-40" /> : <NavIcon />}
          </div>

          </ViewMotionWrapper>

          <motion.div
            className="fixed start-0 top-0 bottom-0 z-20"
            variants={navMenuVariants}
            animate={toggleNavMenu ? "visible" : "hidden"}
            initial = 'hidden'
            transition={{ duration: 0.5 }}
          >
            <NavMenu />
          </motion.div>
        </nav>

        <main onClick={handleMainClick}>{children}</main>
      </div>
  );
};

export default LandingLayout;
