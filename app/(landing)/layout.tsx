"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";

import { useModal } from "@/hooks/useModal";
import { useAppSettings } from "@/context/AppSettingsContext";

import NavIcon from "@/components/navigation/NavIcon";
import NavMenu from "@/components/navigation/NavMenu";
import BookingFormModal from "@/components/modals/BookingFormModal";
import Intro from "@/components/sections/Intro";
import PageHeading from "@/components/headings/PageHeading";
import Swipeable from "@/components/layout/Swipeable";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  const [toggleNavMenu, setToggleNavMenu] = useState(false);
  const nav: any = useRef(null);
  const { toggleIntro, setToggleIntro } = useAppSettings();
  const { handleClose } = useModal();
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    setTimeout(() => {
      setToggleIntro(false)
    }, 2000);
  }, []);

  useEffect(() => {
    setToggleNavMenu(false);
    handleClose();
  }, [path]);

  const navMenuVariants = {
    visible: {
      x: 0,
    },
    hidden: {
      x: -400,
    },
  };

  const handleNavIconClick = () => {
    setToggleNavMenu((prev) => !prev);
  };

  const handleMainClick = (e: any) => {
    if (nav.current && !nav.current.contains(e.target) && toggleNavMenu) {
      setToggleNavMenu(false);
    }
  };

  return (
    <div className="">
      <nav ref={nav}>
        {!toggleIntro && (
          <motion.div
            onClick={handleNavIconClick}
            whileInView={{x: [-20, 0], opacity: [0,1]}}
            initial = {{x: -20, opacity: 0}}
            transition={{ duration: 1 }}
            className="fixed z-30 top-10 start-5 p-2 cursor-pointer flex items-center"
          >
            {/* {toggleNavMenu 
              ? <X className="opacity-40" />  */}
              <NavIcon toggle = {toggleNavMenu} />
            {/* } */}
          </motion.div>
        )}

        <Swipeable onLeft={handleNavIconClick}>
          <motion.div
            className="fixed start-0 top-0 bottom-0 z-20"
            variants={navMenuVariants}
            animate={toggleNavMenu ? "visible" : "hidden"}
            initial="hidden"
            transition={{ duration: 0.6 }}
          >
            <NavMenu />
          </motion.div>
        </Swipeable>
      </nav>

      {/* <PageHeading /> */}

      <main onClick={handleMainClick} className="w-full">{children}</main>

      <div onClick={handleMainClick}>
        <BookingFormModal />
      </div>

      <Intro toggleIntro = {toggleIntro} />
    </div>
  );
};

export default LandingLayout;
