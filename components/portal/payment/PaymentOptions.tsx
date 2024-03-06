"use client";

import React from "react";
import axios from "axios";

import { ClientType } from "@/types";

import PaymentAccordion from "./PaymentAccordion";
import CalendarInvAccordion from "../CalendarInvAccordion";
import { usePortalProgress } from "@/context/PortalProgressContext";

const PaymentOptions = ({ client }: { client: ClientType }) => {
  const { progress, handleSetProgressSection } = usePortalProgress();

  const { isDepositConfirmed, isPaymentConfirmed } = progress;

  const handleDepositPayment = async (orderId: string) => {
    try {
      const res = await axios.post("/api/portal/deposit", { orderId });
      if (res.status === 200) {
        handleSetProgressSection("isDepositConfirmed", true);
      }
    } catch (error) {
      console.log(error);
    }

    handleSetProgressSection("isDepositConfirmed", true);
  };

  const handleTattooPayment = async (orderId: string) => {
    try {
      const res = await axios.post("/api/portal/tattoo", { orderId });

      if (res.status === 200) {
        handleSetProgressSection("isPaymentConfirmed", true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <PaymentAccordion
        option="deposit"
        amount={client?.deposit?.depositAmount}
        handlePayment={handleDepositPayment}
        isCompleted={isDepositConfirmed}
        completedText="You have completed your deposit payment and secured your appointment."
        text={`Kindly make a payment in the amount of ${client?.deposit.depositAmount}  to secure your appointment`}
        up
      />

      <PaymentAccordion
        option="tattoo"
        handlePayment={handleTattooPayment}
        amount={client?.payment?.paymentAmount}
        isCompleted={isPaymentConfirmed}
        completedText="We have recieved your full payment, thank you for your patronage."
        text="Thank you for your patronage"
      />

      <CalendarInvAccordion appointment={client.appointmentDetails} />
    </div>
  );
};

export default PaymentOptions;
