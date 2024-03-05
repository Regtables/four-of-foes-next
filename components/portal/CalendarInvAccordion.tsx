import React from "react";
import Partition from "./PortalLinkList/Partition";
import AccordionLayout from "./layout/AccordionLayout";
import { AppointmentDetailsType } from "@/types";
import { format } from "date-fns";

const CalendarInvAccordion = ({ appointment } : { appointment: AppointmentDetailsType }) => {
  return (
    <div>
      <div className="w-[60%] max-w-[200px] mx-auto">
        <Partition />
      </div>

      <AccordionLayout title="calendar">
        <div className="flex flex-col items-center gap-4">
          <p className="text-[9px] uppercase text-center tracking-[0.1em] w-[80%] mt-2">
            Your appointment is on the {format(new Date(appointment.appointmentDate), 'dd MMMM')}, tap accept to add the appoitnent
            to your calendar.
          </p>

          <button className="border border-1-white text-[9px] px-6 py-1 rounded-full uppercase tracking-[0.3em] max-w-[100px]">
            Accept
          </button>
        </div>
      </AccordionLayout>

      <div className="w-[60%] max-w-[200px] mx-auto">
        <Partition />
      </div>
    </div>
  );
};

export default CalendarInvAccordion;
