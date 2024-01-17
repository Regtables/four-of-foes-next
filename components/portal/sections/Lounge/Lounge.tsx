'use client'

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import PortalAppointmentBanner from "../../PortalAppointmentBanner/PortalAppointmentBanner";
import PortalLinkList from "../../PortalLinkList/PortalLinkList";
import SectionLayout from "../../layout/SectionLayout";
import { useSection } from "@/context/PortalSectionContext";
import { IndemnityType, LoungeLinkType } from "@/types";

const APPOINTMENT = {
  artist: "Ted Faulmann",
  date: new Date(),
  studio: "Concrete Forty",
  country: "Sweden",
};

interface LoungeProps {
  indemnityData: IndemnityType[],
  prepData: string[]
}

const Lounge = ({ indemnityData, prepData } : LoungeProps) => {
  const { currentSection } = useSection()
  const [animatePage, setAnimatePage] = useState({})

  useEffect(() => {
    if(currentSection === 'lounge'){
      setAnimatePage({ opacity: [0,1]})
    } else {
      setAnimatePage({ opacity: 0})
    }
  }, [currentSection])

  const LINKS: LoungeLinkType[] = [
    {
      link: "indemnity",
      type: 'indemnity',
      data: indemnityData
    },
    {
      link: "prep card",
      type: 'prep',
      data: prepData
    },
    {
      link: "location",
      type: 'location',
      data: {}
    },
  ];

  return (
    <SectionLayout section="lounge">
      <motion.div className="h-full w-full flex flex-col items-center" animate = {animatePage} transition={{ duration: 1 }}>
        <div className="h-[75%] w-full relative">
          <Image
            src={"/lounge-ted.jpg"}
            fill
            alt="ted"
            className="object-cover"
          />
        </div>

        <div>
          <PortalAppointmentBanner
            artist={APPOINTMENT.artist}
            date={APPOINTMENT.date}
            studio={APPOINTMENT.studio}
            country={APPOINTMENT.country}
          />
        </div>

        <div className="text-[8px]">*</div>

        <div className="h-[25%] min-w-[45%] md:min-w-[20%] flex items-center">
          <PortalLinkList links={LINKS} />
        </div>
      </motion.div>
    </SectionLayout>
  );
};

export default Lounge;
