import React from "react";
import { motion } from "framer-motion";

import IndemnityTile from "../indemnity/IndemnityTile/IndemnityTile";
import ButtonPill from "@/components/buttons/ButtonPill";
import AccordionLayout from "../layout/AccordionLayout";
import { IndemnityType } from "@/types";

interface IndemnityAccordionProps {
  data: IndemnityType[]
}

const IndemnityAccordion: React.FC<IndemnityAccordionProps> = ({ data }) => {
  const handleCheck = () => {

  }

  return (
    <AccordionLayout title="indemnity" section = {1}>
      <div className="w-[80%]">
        <p className="text-[9px] text-center tracking-[--letter-spacing-sm]">
          Please read through our indemnity clauses, after which you can provide
          consent by agreeing and submitting the form
        </p>

        {data?.length > 0 ? (
          <div className="grid grid-cols-1 gap-2 mt-4">
            {data.map((clause: IndemnityType, i) => (
              <motion.div
                key={i}
                whileInView={{ y: [-20, 0], opacity: [0, 1] }}
                transition={{ duration: 0.7, delay: 0.13 * i }}
                initial={{ y: -20, opacity: 0 }}
                viewport={{ once: true }}
              >
                <IndemnityTile indemnity={clause} handleCheck={handleCheck} />
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
          <ButtonPill text={"sign indemnity"} fill />
        </motion.div>

      </div>
    </AccordionLayout>
  );
};

export default IndemnityAccordion;
