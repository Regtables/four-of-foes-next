"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useSection } from "@/context/PortalSectionContext";
import { ClientType } from "@/types";
import { usePortalProgress } from "@/context/PortalProgressContext";

import SectionLayout from "../../layout/SectionLayout";
import PaymentOptions from "../../payment/PaymentOptions";
import AppointmentActionsDrawer from "../../drawers/AppointmentActionsDrawer";

const Wallet = ({ client } : { client: ClientType }) => {
  const { currentSection } = useSection();
  const [animatePage, setAnimatePage] = useState({});

  const { setProgress, progress } = usePortalProgress()

  useEffect(() => {
    if (currentSection === "wallet") {
      setAnimatePage({ opacity: [0, 1] });
    } else {
      setAnimatePage({ opacity: 0 });
    }
  }, [currentSection]);

  useEffect(() => {
    setProgress(client.progress)
  }, [client])

  return (
    <SectionLayout section="wallet">
      <AnimatePresence>
        {currentSection === 'wallet' && (
          <motion.div
            className="h-full w-full flex flex-col justify-center gap-2 items-center min-w-[40%]"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { opacity: 0, y: 0 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 1
                },
              },
              exit: {
                opacity: 0,
                // y: [0, -20],
                transition: {
                  duration: 0.3
                },
              },}}
          >
            <PaymentOptions client = {client} />

            <AppointmentActionsDrawer />
          </motion.div>
        )}
      </AnimatePresence>
    </SectionLayout>
  );
};

export default Wallet;
