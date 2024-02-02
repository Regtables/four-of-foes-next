import React from "react";
import { motion } from "framer-motion";

import { CheckboxOption } from "@/types";
import { cn } from "@/app/lib/utils";

import Checkbox from "./Checkbox";

const CheckboxList = ({
  options,
  selectedOption,
  handleOptionSelect,
  single
}: {
  options: CheckboxOption[];
  selectedOption: string;
  handleOptionSelect: (option: string) => void;
  single?: boolean
}) => {
  return (
    <div className={cn(`grid grid-cols-2 gap-4`, single && 'grid-cols-1')}>
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
