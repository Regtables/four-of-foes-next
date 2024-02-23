"use client";

import React from "react";
import ModalLayout from "../layout/ModalLayout";
import { useModal } from "@/hooks/useModal";
import ViewMotionWrapper from "@/components/layout/Motion/ViewMotionWrapper";
import AftercareAccordion from "../aftercare/AftercareAccordion/AftercareAccordion";
import { AftercareType } from "@/types";

const AftercareModal = () => {
  const { isOpen, types, data } = useModal();

  console.log(data);

  const isModalOpen = isOpen && types?.includes("aftercare");

  return (
    <ModalLayout isOpen={isModalOpen!} title="aftercare">
      <div className="w-[80%] mx-auto display flex flex-col gap-6 items-center justify-center">
        <p className="text-[9px] text-center tracking-[--letter-spacing-sm]">
          Please read through our indemnity clauses, after which you can provide
          consent by agreeing and submitting the form
        </p>

        <div className="flex flex-col gap-2">
          {Object.values(data as Array<AftercareType>).map((tip, i) => (
            <ViewMotionWrapper>
         
              <AftercareAccordion item={tip as AftercareType} />
            </ViewMotionWrapper>
          ))}
        </div>

        <div className="title">
          Happy Healing!
        </div>
      </div>
    </ModalLayout>
  );
};

export default AftercareModal;
