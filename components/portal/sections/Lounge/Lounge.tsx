"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import {
  AppointmentDetailsType,
  ClientIndemnityType,
  IndemnityType,
  MiniIndemnityClauseType,
} from "@/types";
import { useSection } from "@/context/PortalSectionContext";

import PortalAppointmentBanner from "../../PortalAppointmentBanner/PortalAppointmentBanner";
import SectionLayout from "../../layout/SectionLayout";
import PortalSectionAccordion from "../../PortalSectionAccordion";
import IndemnityAccordion from "../../accordions/IndemnityAccordion";
import TipsAccordion from "../../accordions/TipsAccordion";
import LocationAccordion from "../../accordions/LocationAccordion";

const APPOINTMENT = {
  artist: "Ted Faulmann",
  date: new Date(),
  studio: "Concrete Forty",
  country: "Sweden",
};

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
    clientIndemnity: ClientIndemnityType
  };
  prepData: string[];
  appointmentData: AppointmentDetailsType;
}

const Lounge = ({ indemnityData, prepData, appointmentData }: LoungeProps) => {
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
      <motion.div
        className="h-full w-full flex flex-col items-center"
        animate={animatePage}
        initial={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="h-[75%] w-full relative">
          <Image
            src={"/portal-bg.png"}
            fill
            alt="ted"
            className="object-cover"
          />
        </div>

        <PortalAppointmentBanner
          artist={APPOINTMENT.artist}
          date={appointmentData.appointmentDate}
          studio={appointmentData.appointmentLocation}
          country={appointmentData.appointmentCity}
        />

        <div className="text-[8px]">*</div>

        <div className="h-[25%] w-[60%] md:min-w-[20%] flex items-center relative">
          <div className="w-full absolute left-0 bottom-[5vh] lg:bottom-0 ">
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
        </div>
      </motion.div>
    </SectionLayout>
  );
};

export default Lounge;
