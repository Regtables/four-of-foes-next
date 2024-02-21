"use client";

import React from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";

import { useModal } from "@/hooks/useModal";

import BookingForm from "../sections/BookingForm";
import Popup from "../layout/Popup";
import BookingSideNav from "../booking/BookingSideNav";

const BookingFormModal = () => {
  const { isOpen, types, data, handleClose } = useModal();

  const isModalOpen = isOpen && types?.includes("booking");

  return (
    <Popup isOpen={isModalOpen!} fade opacity={90}>
      <div className="fixed end-[30px] min-w-[100px] h-full md:flex hidden items-center">
        <BookingSideNav />
      </div>

      <BookingForm data={data?.bookingFormData} />

      <div
        className="fixed bottom-6 w-[100vw] flex items-center justify-center z-30"
        onClick={() => handleClose("booking")}
      >
        <motion.div
          className="bg-white h-7 w-7 flex justify-center items-center rounded-full cursor-pointer relative z-100"
          whileInView={{ y: [20, 0], opacity: [0, 1] }}
          transition={{ duration: 1 }}
          exit={{ y: [0, 20] }}
        >
          <X color="black" size={15} />
        </motion.div>
      </div>

      <div className="h-[100px] bg-black/100 fixed top-[-45px] w-full blur-[25px] z-0" />
      <div className="h-[100px] bg-black/100 fixed bottom-[-45px] w-full blur-[25px] z-0" />
    </Popup>
  );
};

export default BookingFormModal;
