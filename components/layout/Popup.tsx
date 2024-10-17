"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useModal } from "@/hooks/useModal";
import { cn } from "@/app/lib/utils";

const Popup = ({
  children,
  isOpen,
  isAlert,
  isLoading,
  black,
  fade,
  onClick,
  h_0,
  opacity = 90,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  isAlert?: boolean;
  isLoading?: boolean;
  opacity?: number;
  fade?: boolean;
  black?: boolean;
  onClick?: any;
  h_0?: boolean;
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
          className={cn(
            `fixed z-10 top-0 left-0 bottom-0 bg-black/90 h-screen w-screen overflow-y-auto content-none scroll-smooth`,
            black && "bg-black",
            isLoading && "z-20"
          )}
          onClick={(e) => handleClickOutside(e)}
          whileInView={fade ? { opacity: [0, 1] } : {}}
          // animate = {{opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          initial={fade ? { opacity: 0 } : {}}
          id="popup"
        >
          <div
<<<<<<< HEAD
            className={cn("flex flex-col items-center h-full relative z-0", h_0 && 'h-0')}
=======
            className={cn(
              "flex flex-col items-center h-full relative",
              h_0 && "h-0"
            )}
>>>>>>> portal-messenger
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
