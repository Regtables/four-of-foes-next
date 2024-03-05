'use client'

import React from "react";
import axios from "axios";

import { ClientType } from "@/types";

import PaymentAccordion from "./PaymentAccordion";
import CalendarInvAccordion from "../CalendarInvAccordion";

const PaymentOptions = ({ client } : { client: ClientType }) => {
  const handleDepositPayment = async (orderId: string) => {
    const res = await axios.post('/api/portal/deposit', { orderId })

    console.log(res)
  }

  const handleTattooPayment = async (orderId: string) => {
    const res = await axios.post('/api/portal/tattoo', { orderId })

    console.log(res)
  }

  return (
    <div className="flex flex-col items-center w-full">
      <PaymentAccordion
        option="deposit"
        amount={client?.deposit?.depositAmount}
        handlePayment = {handleDepositPayment}
        text={`Kindly make a payment in the amount of ${client?.deposit.depositAmount}  to secure your appointment`}
        up
      />

      <PaymentAccordion
        option="tattoo"
        handlePayment={handleTattooPayment}
        amount={client?.payment?.paymentAmount}
        text="Thank you for your patronage"
      />

      <CalendarInvAccordion appointment={client.appointmentDetails} />
    </div>
  );
};

export default PaymentOptions;
