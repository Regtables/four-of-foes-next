"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useModal } from "@/hooks/useModal";
import { cn } from "@/app/lib/utils";

const Popup = ({
  children,
  isOpen,
  isAlert,
  black,
  fade,
  onClick
}: {
  children: React.ReactNode;
  isOpen: boolean;
  isAlert?: boolean;
  opacity?: number;
  fade?: boolean
  black?: boolean,
  onClick?: any
}) => {
  const { handleClose } = useModal();

  const content: any = useRef(null);

  const handleClickOutside = (e: any) => {
    if (!isAlert && content.current && !content.current.contains(e.target)) {
      handleClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={cn(`fixed z-10 top-0 left-0 bottom-0 bg-black/90 h-screen w-screen overflow-y-auto content-none scroll-smooth`, black && 'bg-black')}
          onClick={(e) => handleClickOutside(e)}
          whileInView={fade ? { opacity: [0, 1] } : {}}
          // animate = {{opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          initial={fade ? { opacity: 0 } : {}}
          id="popup"
        >
          <div
            className="flex flex-col items-center h-full relative"
            ref={content}
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Popup;
