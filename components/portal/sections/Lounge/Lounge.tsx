"use client";

import React, { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import {
  AppointmentDetailsType,
  ClientIndemnityType,
  IndemnityType,
  MiniIndemnityClauseType,
} from "@/types";
import { useSection } from "@/context/PortalSectionContext";

import PortalAppointmentBanner from "../../PortalAppointmentBanner/PortalAppointmentBanner";
import SectionLayout from "../../layout/SectionLayout";
import PortalSectionAccordion from '@/components/portal/PortalSectionAccordion';
import IndemnityAccordion from "@/components/portal/accordions/IndemnityAccordion";
import TipsAccordion from "@/components/portal/accordions/TipsAccordion";
import LocationAccordion from "@/components/portal/accordions/LocationAccordion";

const SHOP = {
  name: "hood7",
  logo: "",
  instagram: {
    handle: "@hood7",
    link: "",
  },
  location: {
    address: "123 somewhere sick, Woodstock, 8019, Cape Town, South Africa",
    link: "",
  },
  images: ["/lounge-ted.JPG", "/portal-bg.png", "/landing-bg.jpeg"],
};

interface LoungeProps {
  indemnityData: {
    clausesData: IndemnityType[];
    miniClausesData: MiniIndemnityClauseType[];
    clientIndemnity: ClientIndemnityType;
  };
  prepData: string[];
  appointmentData: AppointmentDetailsType;
  clientName: string
}

const Lounge = ({ indemnityData, prepData, appointmentData, clientName }: LoungeProps) => {
  const { currentSection } = useSection();
  const [animatePage, setAnimatePage] = useState({});

  useEffect(() => {
    if (currentSection === "lounge") {
      setAnimatePage({ opacity: [0, 1] });
    } else {
      setAnimatePage({ opacity: 0 });
    }
  }, [currentSection]);

  return (
    <SectionLayout section="lounge">
      <AnimatePresence>
        {currentSection === "lounge" && (
          <motion.div
            className="h-full w-full flex flex-col items-center"
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
              },
            }}
          >
            <motion.div
              className="h-[65%] w-full relative"
              transition={{ duration: 1 }}
            >
              <Image
                src={"/portal-bg.png"}
                fill
                alt="ted"
                className="object-cover"
                priority
              />
            </motion.div>

            <motion.div
              // variants={{
              //   hidden: { y: -20 },
              //   visible: { y: 0 },
              //   exit: { y: -20 },
              // }}
              transition={{duration: 1}}
            >
              <PortalAppointmentBanner
                clientName={clientName}
                date={appointmentData.appointmentDate}
                studio={appointmentData.appointmentLocation}
                country={appointmentData.appointmentCity}
              />
            </motion.div>

            <motion.div
              // variants={{
              //   hidden: { y: -20 },
              //   visible: { y: 0 },
              //   exit: { y: -20 },
              // }}
              transition={{ duration: 1}}
            >
              <div className="text-[10px]">*</div>
            </motion.div>

            <motion.div
              className="h-[25%] w-[60%] lg:min-w-[20%] flex items-center relative"
              // variants={{
              //   hidden: { y: -20 },
              //   visible: { y: 0 },
              //   exit: { y: -20 },
              // }}
              transition={{ duration: 1 }}
            >
              <div className="w-full absolute left-0 bottom-[5vh] lg:bottom-[6vh] my-auto">
                <PortalSectionAccordion
                  Section1={
                    <IndemnityAccordion
                      indemnityClauses={indemnityData.clausesData}
                      miniIndemnityClauses={indemnityData.miniClausesData}
                      clientIndemnity={indemnityData.clientIndemnity}
                    />
                  }
                  Section2={<TipsAccordion data={prepData} />}
                  Section3={<LocationAccordion data={SHOP} />}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionLayout>
  );
};

export default Lounge;
