'use client'

import { useModal } from "@/hooks/useModal";
import React from "react";

const CancelAppointment = () => {
  const { handleOpen } = useModal()

  return (
    <button 
      className="h-full flex items-center justify-center w-full text-[8px] uppercase tracking-[0.4em] text-[#a9a9a9]"
      onClick={() => handleOpen('appointmentActions')}
    >
      cancel/resheudle
    </button>
  );
};

export default CancelAppointment;
