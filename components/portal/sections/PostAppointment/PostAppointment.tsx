"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Asterisk } from "lucide-react";

import { AftercareType, ClientType } from "@/types";
import { usePortalProgress } from "@/context/PortalProgressContext";

import PortalSectionAccordion from "../../PortalSectionAccordion";
import AftercareAccordion from "../../accordions/AftercareAccordion";
import TattooImagesAccordion from "../../accordions/TattooImagesAccordion";
import FeedbackAccordion from "../../accordions/FeedbackAccordion";

const PostAppointment = ({ aftercareData, client }: { aftercareData: AftercareType[], client: ClientType }) => {
  const { setProgress } = usePortalProgress()

  useEffect(() => {
    setProgress(client.progress)
  }, [client])

  return (
    <div className="w-full h-full flex flex-col">
      <div className="h-[73%] w-full relative">
        <Image src={"/portal-bg.png"} fill alt="ted" className="object-cover" />
      </div>
      <header className="text-center flex flex-col items-center gap-2 h-[8%] mt-2">
        <h1 className="tracking-[0.6em] text-[8px] uppercase">Thank you for your patronage</h1>
        <Asterisk size={8} />
      </header>
      <div className="min-w-[45%] w-[60%] h-[17%] mx-auto md:min-w-[20%] flex items-center relative">
        <div className="absolute left-0 bottom-[40px] lg:bottom-[20px] w-full ">
          <PortalSectionAccordion
            Section1 = {<AftercareAccordion data = {aftercareData} />} 
            Section2 = {<TattooImagesAccordion images={client.tattooImages} />}
            Section3 = {<FeedbackAccordion data = {client.review} />}
          />
        </div>
      </div>
    </div>
  );
};

export default PostAppointment;
