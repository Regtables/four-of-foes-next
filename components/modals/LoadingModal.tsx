"use client";

import React from "react";
import { Triangle } from "react-loader-spinner";

import { useModal } from "@/hooks/useModal";
import Popup from "../layout/Popup";

const LoadingModal = () => {
  const { isOpen, types } = useModal();

  const isModalOpen = isOpen && types?.includes("loading");

  return (
    <Popup isOpen={isModalOpen!} isAlert>
      <div className="h-full flex items-center">
        <Triangle
          visible={true}
          height="40"
          width="40"
          color="white"
          ariaLabel="triangle-loading"
        />
      </div>
    </Popup>
  );
};

export default LoadingModal;
