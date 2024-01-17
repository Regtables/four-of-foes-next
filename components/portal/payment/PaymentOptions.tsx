'use client'

import React from "react";
import PaymentAccordion from "./PaymentAccordion";
import Partition from "../PortalLinkList/Partition";
import { useModal } from "@/hooks/useModal";

const PaymentOptions = () => {
  const { handleOpen } = useModal();

  return (
    <div className="flex flex-col items-center w-full">
      <PaymentAccordion
        option="deposit"
        amount={300}
        text="Kindly make a payment in the amount of €1500 to secure your appointment"
        up
      />

      <PaymentAccordion
        option="tattoo"
        amount={700}
        text="Thank you for your patronage"
      />

      <div className="w-[60%] max-w-[200px] mx-auto">
        <Partition />
      </div>

      <button className="tracking-[0.5em] uppercase w-full active:bg-white active:text-black rounded-sm text-white transition max-w-[60%]" onClick={() => handleOpen('calendar')}>
        <div className="py-2 text-[9px] mx-auto text-center">{"calendar"}</div>
      </button>

      <div className="w-[60%] max-w-[200px] mx-auto">
        <Partition />
      </div>
    </div>
  );
};

export default PaymentOptions;
