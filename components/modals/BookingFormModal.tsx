"use client";

import React from "react";

import { useModal } from "@/hooks/useModal";

import BookingForm from "../sections/BookingForm";
import Popup from "../layout/Popup";

const BookingFormModal = () => {
  const { isOpen, type, data } = useModal();

  const isModalOpen = isOpen && type === "booking";

  return (
    <Popup isOpen={isModalOpen}>
      <BookingForm data = {data} />
    </Popup>
  );
};

export default BookingFormModal;
