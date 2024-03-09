import React from "react";
import { motion } from "framer-motion";

import { useModal } from "@/hooks/useModal";

import ModalLayout from "../../layout/ModalLayout";
import ButtonPill from "@/components/buttons/ButtonPill";
import { IndemnityType } from "@/types";

const IndemnityModal = () => {
  const { isOpen, types, data } = useModal();

  const content = Object.values(data as Array<IndemnityType>) as [];
  const isModalOpen = isOpen && types?.includes("indemnity") ? true : false;

  console.log(content)

  const handleCheck = () => {

  }

  return (
    <ModalLayout isOpen={isModalOpen} title="Indemnity">
      <div>
        <p className="text-[9px] text-center tracking-[--letter-spacing-sm]">
          Please read through our indemnity clauses, after which you can provide
          consent by agreeing and submitting the form
        </p>
      </div>

      {content?.length > 0 ? (
        <div className="grid grid-cols-1 gap-2 mt-4">
          {/* {content.map((clause, i) => (
            <motion.div
              key={i}
              whileInView={{ y: [-20, 0], opacity: [0, 1] }}
              transition={{ duration: 0.7, delay: 0.13 * i }}
              initial={{ y: -20, opacity: 0 }}
              viewport={{ once: true }}
            >
              <IndemnityTile indemnity={clause} handleCheck={handleCheck}/>
            </motion.div>
          ))} */}
        </div>
      ) : (
        <></>
      )}

      <motion.div 
        className="w-full h-[40px] mt-2"
        whileInView={{ y: [10, 0], opacity: [0, 1] }}
        transition={{ duration: 0.8, delay: 0.8, ease: "easeInOut" }}
        initial={{ y: 10, opacity: 0 }}
        viewport={{ once: true }}
      >
        <ButtonPill text={"sign indemnity"} fill />
      </motion.div>
    </ModalLayout>
  );
};

export default IndemnityModal;
