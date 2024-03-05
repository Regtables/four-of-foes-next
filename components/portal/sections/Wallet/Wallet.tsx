"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { useSection } from "@/context/PortalSectionContext";

import SectionLayout from "../../layout/SectionLayout";
import PaymentOptions from "../../payment/PaymentOptions";
import CancelAppointment from "@/components/buttons/CancelAppointment";
import AppointmentActionsDrawer from "../../drawers/AppointmentActionsDrawer";
import { ClientType } from "@/types";

const Wallet = ({ client } : { client: ClientType }) => {
  const { currentSection } = useSection();
  const [animatePage, setAnimatePage] = useState({});

  useEffect(() => {
    if (currentSection === "wallet") {
      setAnimatePage({ opacity: [0, 1] });
    } else {
      setAnimatePage({ opacity: 0 });
    }
  }, [currentSection]);

  return (
    <SectionLayout section="wallet">
      <motion.div
        className="h-full w-full flex flex-col justify-center gap-2 items-center min-w-[40%]"
        animate={animatePage}
        transition={{ duration: 1 }}
        initial={{ opacity: 0 }}
      >
        <PaymentOptions client = {client} />

        <AppointmentActionsDrawer />
      </motion.div>
    </SectionLayout>
  );
};

export default Wallet;
