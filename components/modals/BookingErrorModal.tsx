"use client";

import { useModal } from "@/context/ModalContext";
import React from "react";
import Popup from "../layout/Popup";
import { Asterisk } from "lucide-react";
import ButtonPill from "../buttons/ButtonPill";
import Image from "next/image";

const AlertModal = () => {
  const { isOpen, types, data, handleModalClose } = useModal();

  // if(!data?.alertData) return null

  const isModalOpen = isOpen && types?.includes("bookingError");

  return (
    <Popup isOpen={isModalOpen!} fade>
      <div className="border-4 border-[var(--color-gold)] w-[80%] flex flex-col items-center text-center gap-8 py-8 px-10 rounded-2xl my-auto">
        <h2 className="text-[var(--color-gold)] uppercase tracking-[0.1em] text-2xl font-bold heading-font">
          Request Error
        </h2>
        <Asterisk size={15} />

        <p className="text-center text-[10px] tracking-[0.15em] italic">
          Something went wrong when trying to process your booking. Please try
          again or contact the studio
        </p>

        <div
          className="min-w-[80px] min-h-[40px]"
          onClick={() => handleModalClose("bookingError")}
        >
          <ButtonPill text={"okay"} />
        </div>
      </div>
    </Popup>
  );
};

export default AlertModal;
