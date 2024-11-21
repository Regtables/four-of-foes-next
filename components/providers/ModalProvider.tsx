"use client";

import React, { useEffect, useState } from "react";

import LoadingModal from "../modals/LoadingModal";
import AlertModal from "../modals/AlertModal";

import BookingSuccessModal from "../modals/BookingSucessModal";
import BookingErrorModal from "../modals/BookingErrorModal"
import ImagePreviewModal from "../modals/ImagePreviewModal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <LoadingModal />
      <AlertModal />
      <BookingSuccessModal />
      <ImagePreviewModal />
      <BookingErrorModal />
    </>
  );
};

export default ModalProvider;
