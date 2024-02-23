import { useModal } from "@/hooks/useModal";
import React, { useState } from "react";
import ModalLayout from "../../layout/ModalLayout";
import ButtonPill from "@/components/buttons/ButtonPill";
import Calendar from "@/components/booking/Calendar";
import Partition from "../../PortalLinkList/Partition";

const CancelAppointmentModal = () => {
  const { isOpen, types } = useModal();
  const [resheudleDate, setResheudleDate] = useState("");

  const isModalOpen = isOpen && types?.includes("appointmentActions");

  return (
    <ModalLayout isOpen={isModalOpen!} title="cancel/resheudle">
      <div className="flex flex-col gap-6 items-center w-[80vw]">
        <div className="flex flex-col gap-2 w-full">
          <h3 className="title text-center mb-4">Resheudle Appointment</h3>

          <Calendar
            confirmedDate={resheudleDate}
            setConfirmedDate={setResheudleDate}
          />

          <div className="w-full h-[28px] mx-auto mt-4">
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

          <div className="w-full h-[28px]">
            <ButtonPill text="request cancelation" fill />
          </div>
        </div>
      </div>
    </ModalLayout>
  );
};

export default CancelAppointmentModal;
