"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { AppointmentDetailsType, IndemnityType, LoungeLinkType } from "@/types";
import { useSection } from "@/context/PortalSectionContext";

import PortalAppointmentBanner from "../../PortalAppointmentBanner/PortalAppointmentBanner";
import PortalLinkList from "../../PortalLinkList/PortalLinkList";
import SectionLayout from "../../layout/SectionLayout";
import PortalSectionAccordion from "../../PortalSectionAccordion";
import IndemnityAccordion from "../../accordions/IndemnityAccordion";
import TipsAccordion from "../../accordions/TipsAccordion";
import LocationAccordion from "../../accordions/LocationAccordion";
import { getSession } from "@/app/lib/actions/clients/auth";

const APPOINTMENT = {
  artist: "Ted Faulmann",
  date: new Date(),
  studio: "Concrete Forty",
  country: "Sweden",
};

const SHOP = {
  name: 'hood7',
  logo: '',
  instagram: {
    handle: '@hood7',
    link: ''
  },
  location: {
    address: '123 somewhere sick, Woodstock, 8019, Cape Town, South Africa',
    link: ''
  },
  images: [
    '/lounge-ted.JPG',
    '/portal-bg.png',
    '/landing-bg.jpeg'
  ]
}

interface LoungeProps {
  indemnityData: IndemnityType[];
  prepData: string[];
  appointmentData: AppointmentDetailsType
}

const Lounge = ({ indemnityData, prepData, appointmentData }: LoungeProps) => {
  const { currentSection } = useSection();
  const [animatePage, setAnimatePage] = useState({});

  console.log(appointmentData)
  useEffect(() => {
    if (currentSection === "lounge") {
      setAnimatePage({ opacity: [0, 1] });
    } else {
      setAnimatePage({ opacity: 0 });
    }
  }, [currentSection]);

  const LINKS: LoungeLinkType[] = [
    {
      link: "indemnity",
      type: "indemnity",
      data: indemnityData,
    },
    {
      link: "prep card",
      type: "prep",
      data: prepData,
    },
    {
      link: "location",
      type: "location",
      data: {},
    },
  ];

  console.log(prepData)
  // const SECTION_LIST = () => {
  //   section1:
  // }

  return (
    <SectionLayout section="lounge">
      <motion.div
        className="h-full w-full flex flex-col items-center"
        animate={animatePage}
        initial = {{opacity: 0}}
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

        <div>
          <PortalAppointmentBanner
            artist={APPOINTMENT.artist}
            date={appointmentData.appointmentDate}
            studio={appointmentData.appointmentLocation}
            country={appointmentData.appointmentCity}
          />
        </div>

        <div className="text-[8px]">*</div>

        <div className="h-[25%] w-20 md:min-w-[20%] flex items-center">
          {/* <PortalLinkList links={LINKS} /> */}
          <PortalSectionAccordion
            Section1={<IndemnityAccordion data = {indemnityData}/>}
            Section2={<TipsAccordion data={prepData} />}
            Section3={<LocationAccordion data={SHOP} />}
          />
        </div>
      </motion.div>
    </SectionLayout>
  );
};

export default Lounge;
