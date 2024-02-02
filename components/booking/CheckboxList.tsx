import React from "react";
import { motion } from "framer-motion";

import { CheckboxOption } from "@/types";
import Checkbox from "./Checkbox";

const CheckboxList = ({
  options,
  selectedOption,
  handleOptionSelect,
  cols = 2
}: {
  options: CheckboxOption[];
  selectedOption: string;
  handleOptionSelect: (option: string) => void;
  cols?: number
}) => {
  return (
    <div className={`grid grid-cols-${cols} gap-4`}>
      {options.map((option) => (
        <motion.div
          className="flex"
          whileInView={{ opacity: [0, 1] }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Checkbox
            //@ts-ignore
            option={option.choice}
            selectedOption={selectedOption}
            handleOptionSelect={handleOptionSelect}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default CheckboxList;
