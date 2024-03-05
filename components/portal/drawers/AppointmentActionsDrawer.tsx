"use client";

import React, { useRef, useState } from "react";

import DrawerLayout from "../layout/DrawerLayout";
import Calendar from "@/components/booking/Calendar";
import ButtonPill from "@/components/buttons/ButtonPill";
import Partition from "../PortalLinkList/Partition";

const AppointmentActionsDrawer = () => {
  const [resheudleDate, setResheudleDate] = useState('')

  return (
    <DrawerLayout title={"cancel/resheudule"}>
      <div className="flex flex-col gap-6 items-center">
        <div className="flex flex-col gap-2 w-full">
          <h3 className="title text-center mb-4">Resheudle Appointment</h3>

          <Calendar
            confirmedDate={resheudleDate}
            setConfirmedDate={setResheudleDate}
          />

          <div className="w-[60vw] h-[28px] mx-auto mt-4">
            <ButtonPill
              text="request new date"
              fill={resheudleDate ? true : false}
              disabled={!resheudleDate ? true : false}
            />
          </div>
        </div>

        <div className="w-20">
          <Partition />
        </div>

        <div className="flex flex-col gap-4 w-full">
          <h3 className="title text-center">Cancel Appointment</h3>

          <div className="w-[60vw] mx-auto h-[28px]">
            <ButtonPill text="request cancelation" fill />
          </div>
        </div>
      </div>
    </DrawerLayout>
  );
};

export default AppointmentActionsDrawer;
