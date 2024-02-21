"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";

const NavIcon = ({ toggle }: { toggle: boolean }) => {
  const barStyles = "min-h-[1px] h-[1.5px] bg-white w-[18px]";

  const topVariants = {
    open: { rotate: "45deg", y: 5 },
    closed: { rotate: "0deg" },
  };

  const midVariants = {
    open: { rotate: "-45deg", y: 0 },
    closed: { rotate: "0deg" },
  };

  const botVariants = {
    open: { rotate: "90deg", opacity: 0 },
    closed: { rotate: "0deg", opacity: 1 },
  };

  const transition = { duration: 0.5 }

  useEffect(() => {}, [toggle]);

  return (
    <div className="w-full flex flex-col gap-[4px]">
      {/* <Menu className='cursor-pointer'/> */}
      <motion.div
        className={barStyles}
        id="top"
        variants={topVariants}
        animate={toggle ? "open" : "closed"}
        transition={transition}
      />

      <motion.div
        className={barStyles}
        id="mid"
        variants={midVariants}
        animate={toggle ? "open" : "closed"}
        style={{ height: "1.5px" }}
        transition={transition}
      />

      <motion.div
        className={barStyles}
        id="bot"
        variants={botVariants}
        animate={toggle ? "open" : "closed"}
        transition={transition}
      />
    </div>
  );
};

export default NavIcon;
