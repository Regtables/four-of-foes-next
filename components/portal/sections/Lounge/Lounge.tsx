import React from "react";
import Image from "next/image";

import { fetchIndemnityContent, fetchPrepContent } from "@/app/lib/actions/content/fetchContent";

import PortalAppointmentBanner from "../../PortalAppointmentBanner/PortalAppointmentBanner";
import PortalLinkList from "../../PortalLinkList/PortalLinkList";
import SectionLayout from "../../layout/SectionLayout";

const APPOINTMENT = {
  artist: "Ted Faulmann",
  date: new Date(),
  studio: "Concrete Forty",
  country: "Sweden",
};

const Lounge = async () => {
  const prepContent = fetchPrepContent()
  const indemnityContent = fetchIndemnityContent()

  const [prepData, indemnityData] = await Promise.all([prepContent, indemnityContent])

  const LINKS = [
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
      type: 'location'
    },
  ];

  return (
    <SectionLayout section="lounge">
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
    </SectionLayout>
  );
};

export default Lounge;
