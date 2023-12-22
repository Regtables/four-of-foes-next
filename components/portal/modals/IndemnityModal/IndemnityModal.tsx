import React from "react";
import { motion } from "framer-motion";

import { useModal } from "@/hooks/useModal";

import ModalLayout from "../../layout/ModalLayout";
import IndemnityTile from "../../indemnity/IndemnityTile/IndemnityTile";
import ButtonPill from "@/components/buttons/ButtonPill";

const IndemnityModal = () => {
  const { isOpen, type, data } = useModal();

  const content = data || [];
  const isModalOpen = isOpen && type === "indemnity";

  return (
    <ModalLayout isOpen={isModalOpen} title="Indemnity">
      <div>
        <p className="text-[9px] text-center tracking-[--letter-spacing-sm]">
          Please read through our indemnity clauses, after which you can provide
          consent by agreeing and submitting the form
        </p>
      </div>

      {content.length > 0 ? (
        <div className="grid grid-cols-1 gap-2 mt-4">
          {content.map((clause, i) => (
            <motion.div
              key={i}
              whileInView={{ y: [-20, 0], opacity: [0, 1] }}
              transition={{ duration: 0.7, delay: 0.13 * i }}
              initial={{ y: -20, opacity: 0 }}
              viewport={{ once: true }}
            >
              <IndemnityTile indemnity={clause} />
            </motion.div>
          ))}
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
        <ButtonPill text={"sign indemnity"} />
      </motion.div>
    </ModalLayout>
  );
};

export default IndemnityModal;
