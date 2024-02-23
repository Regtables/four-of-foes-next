import Popup from "@/components/layout/Popup";
import React from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";

import { useModal } from "@/hooks/useModal";

import ModalTitle from "../modals/ModalTitle";
import ViewMotionWrapper from "@/components/layout/Motion/ViewMotionWrapper";

interface ModalLayoutProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
}

const ModalLayout = ({ isOpen, title, children }: ModalLayoutProps) => {
  const { handleClose } = useModal();

  return (
    // <>
    //   {isOpen && (
    <Popup isOpen={isOpen} fade h_0>
      <div className="mt-16">
        <ViewMotionWrapper y={-10}>
          <ModalTitle>{title}</ModalTitle>
        </ViewMotionWrapper>

        <div className="pt-8">{children}</div>

        <div
          className="fixed bottom-6 w-[100vw] flex items-center justify-center z-30"
          onClick={() => handleClose()}
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
      </div>
    </Popup>
    //   )}
    // </>
  );
};

export default ModalLayout;
