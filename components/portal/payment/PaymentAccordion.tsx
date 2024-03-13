"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import Partition from "../PortalLinkList/Partition";
import { useCheckout } from "@/hooks/useCheckout";
import { useModal } from "@/context/ModalContext";

interface PaymentAccordionProps {
  up?: boolean;
  option: string;
  text: string;
  amount: number;
  isCompleted: boolean;
  completedText: string;
  handlePayment: (orderId: string) => Promise<void>;
}

const PaymentAccordion = ({
  up,
  text,
  handlePayment,
  amount,
  option,
  isCompleted,
  completedText,
}: PaymentAccordionProps) => {
  const [toggle, setToggle] = useState(false);
  const [height, setHeight] = useState("0px");
  const [animateContainer, setAnimateContainer] = useState({});
  const [animateText, setAnimateText] = useState({});
  const [animateButton, setAnimateButton] = useState({});
  const content: any = useRef(null);

  const { createPaypalOrder } = useCheckout();
  const { handleModalOpen, handleModalClose } = useModal()

  const handleToggle = () => {
    if (!toggle) {
      setToggle(true);

      setHeight(`${content.current.scrollHeight}px`);

      setAnimateText({ opacity: 1 });
      setAnimateButton({ opacity: 1 });
    } else {
      setToggle(false);
      setHeight("0px");

      setAnimateText({ opacity: 0 });
      setAnimateButton({ opacity: 0 });
    }
  };

  return (
    <motion.div
      className="w-[90%] flex flex-col items-center"
      animate={animateContainer}
      transition={{ duration: 0.5 }}
      onClick={handleToggle}
    >
      <div className="w-[200px] mx-auto">
        <Partition />
      </div>

      <button className="tracking-[0.5em] uppercase active:bg-white active:text-black rounded-sm text-white transition-all duration-300 w-[200px]">
        <div className="py-2 text-[9px] mx-auto text-center">{option}</div>
      </button>

      <div
        ref={content}
        className="flex flex-col items-center gap-3 overflow-y-hidden transition-all duration-500"
        style={{ maxHeight: height }}
      >
        {isCompleted ? (
          <p className="text-center paragraph py-4">{completedText}</p>
        ) : (
          <>
            <motion.p
              className="text-center paragraph py-1"
              initial={{ opacity: 0 }}
              animate={animateText}
              transition={{ duration: 1, delay: 0.3 }}
            >
              {text}
            </motion.p>
            <div className="h-[60px] pb-4">
              <PayPalScriptProvider
                options={{
                  clientId:
                    "Aaem8OpbrlxjaXeiVXf3h2jCfMOIZeR40K4Yvgo8-Jdpxw9AXl-NqZTE7a670MTPuX4yNaN3pAAcxPAG",
                  disableFunding: "card",
                  currency: 'EUR'
                }}
              >
                <PayPalButtons
                  style={{ color: "white", shape: "pill", height: 40 }}
                  createOrder={function (data, action) {
                    return createPaypalOrder(amount);
                  }}
                  onApprove={(data, actions) => {
                    return handlePayment(data.orderID);
                  }}
                  onError={(err) => {
                    console.log(err)
                    handleModalOpen('alert', { alert: {
                      title: "Payment Error",
                      content: 'There was an issue when trying to process your payment, please try again',
                      confirm: 'okay',
                      handleConfirm: () => handleModalClose('alert')
                    }})
                  }
                  }
                />
              </PayPalScriptProvider>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default PaymentAccordion;
