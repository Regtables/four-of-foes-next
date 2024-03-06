"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { Asterisk } from "lucide-react";

import PortalSectionAccordion from "../../PortalSectionAccordion";
import AftercareAccordion from "../../accordions/AftercareAccordion";
import TattooImagesAccordion from "../../accordions/TattooImagesAccordion";
import FeedbackAccordion from "../../accordions/FeedbackAccordion";
import { AftercareType, ClientType } from "@/types";
import { usePortalProgress } from "@/context/PortalProgressContext";

const PostAppointment = ({ aftercareData, client }: { aftercareData: AftercareType[], client: ClientType }) => {
  const { setProgress } = usePortalProgress()

  useEffect(() => {
    setProgress(client.progress)
  }, [client])

  return (
    <div className="w-full h-full flex flex-col">
      <div className="h-[75%] w-full relative">
        <Image src={"/portal-bg.png"} fill alt="ted" className="object-cover" />
      </div>
      <header className="text-center flex flex-col items-center gap-4">
        <h1 className="title tracking-wide">Thank you for your patronage</h1>
        <Asterisk size={10} />
      </header>
      <div className="min-w-[45%] w-[60%] mx-auto md:min-w-[20%] flex items-center">
        {/* <PortalLinkList links={data} /> */}
        <PortalSectionAccordion
          Section1 = {<AftercareAccordion data = {aftercareData} />} 
          Section2 = {<TattooImagesAccordion images={client.tattooImages} />}
          Section3 = {<FeedbackAccordion data = {client.review} />}
        />
      </div>
    </div>
  );
};

export default PostAppointment;
