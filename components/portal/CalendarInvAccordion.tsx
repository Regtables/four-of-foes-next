import React from "react";
import { format } from "date-fns";

import { AppointmentDetailsType } from "@/types";
import { createDownloadLink, generateGoogleCalendarURL } from "@/utils/helpers";
import { useModal } from "@/context/ModalContext";

import Partition from "./PortalLinkList/Partition";
import AccordionLayout from "./layout/AccordionLayout";

const CalendarInvAccordion = ({
  appointment,
}: {
  appointment: AppointmentDetailsType;
}) => {
  const { handleModalOpen, handleModalClose, handleActionErrorAlertOpen } =
    useModal();

  const googleURL = generateGoogleCalendarURL(appointment);

  const handleDownload = async () => {
    try {
      handleModalOpen("loading");
      const res = await fetch("/api/portal/downloads/calendar", {
        method: "GET",
        headers: {
          credentials: "same-origin",
        },
      });

      if (res.ok) {
        createDownloadLink(res, "tattoo-appointment.ics");
      }
    } catch (error) {
      console.log(error);

      handleActionErrorAlertOpen("creating your calendar invitation");
    } finally {
      handleModalClose("loading");
    }
  };

  return (
    <div>
      <div className="w-[60%] max-w-[200px] mx-auto">
        <Partition />
      </div>

      <AccordionLayout title="calendar">
        <div className="flex flex-col items-center gap-4">
          <p className="text-[9px] uppercase text-center tracking-[0.1em] w-[80%] mt-2">
            Your appointment is on the{" "}
            {format(new Date(appointment.appointmentDate), "dd MMMM")}, tap
            accept to add the appoitnent to your calendar.
          </p>

          <a
            href={googleURL}
            target="_blank"
            rel="noreferrer"
            className="text-center cursor-pointer text-[8px] uppercase tracking-[0.3em] text-[#dfdfdf] underline"
          >
            <button
              className="border border-1-white text-[9px] px-6 py-1 rounded-full uppercase tracking-[0.3em] max-w-[100px]"
              onClick={handleDownload}
            >
              Accept
            </button>
          </a>
        </div>
      </AccordionLayout>

      <div className="w-[60%] max-w-[200px] mx-auto">
        <Partition />
      </div>
    </div>
  );
};

export default CalendarInvAccordion;
