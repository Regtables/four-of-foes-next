"use client";
import React, { useState } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";

import NavIcon from "@/components/navigation/NavIcon";
import NavMenu from "@/components/navigation/NavMenu";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  const [toggleNavMenu, setToggleNavMenu] = useState(false);

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

  return (
    <div>
      <nav>
        <div
          onClick={handleNavIconClick}
          className="fixed z-30 top-10 start-5 cursor-pointer"
        >
          {toggleNavMenu ? <X className="opacity-40" /> : <NavIcon />}
        </div>

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

      <main>{children}</main>
    </div>
  );
};

export default LandingLayout;
