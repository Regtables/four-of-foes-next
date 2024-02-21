"use client";

import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";

import { useModal } from "@/hooks/useModal";
import { useAppSettings } from "@/context/AppSettingsContext";

import NavIcon from "@/components/navigation/NavIcon";
import NavMenu from "@/components/navigation/NavMenu";
import ViewMotionWrapper from "@/components/layout/Motion/ViewMotionWrapper";
import BookingFormModal from "@/components/modals/BookingFormModal";
import Intro from "@/components/sections/Intro";
import PageHeading from "@/components/headings/PageHeading";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  const [toggleNavMenu, setToggleNavMenu] = useState(false);
  const nav: any = useRef(null);
  const { toggleIntro, setToggleIntro } = useAppSettings();
  const { handleClose } = useModal();
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    // setTimeout(() => {
    //   setToggleIntro(false)
    // }, );
  });

  useEffect(() => {
    setToggleNavMenu(false);
    handleClose();
  }, [path]);

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
    if (nav.current && !nav.current.contains(e.target) && toggleNavMenu) {
      setToggleNavMenu(false);
    }
  };

  return (
    <div className="">
      <nav ref={nav}>
        <div
          onClick={handleNavIconClick}
          className="fixed z-30 top-12 start-5 cursor-pointer flex items-center"
        >
          {toggleNavMenu ? <X className="opacity-40" /> : <NavIcon />}

          {/* <PageHeading /> */}
        </div>

        <motion.div
          className="fixed start-0 top-0 bottom-0 z-20"
          variants={navMenuVariants}
          animate={toggleNavMenu ? "visible" : "hidden"}
          initial="hidden"
          transition={{ duration: 0.5 }}
        >
          <NavMenu />
        </motion.div>
      </nav>

      {/* <PageHeading /> */}

      <main onClick={handleMainClick} className="w-full">{children}</main>

      <div onClick={handleMainClick}>
        <BookingFormModal />
      </div>

      {/* <Intro toggleIntro = {toggleIntro} /> */}
    </div>
  );
};

export default LandingLayout;
