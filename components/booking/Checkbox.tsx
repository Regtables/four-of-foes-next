import React from "react";
import { motion } from "framer-motion";

import { cn } from "@/app/lib/utils";
import { CheckboxOption } from "@/types";

const Checkbox = ({
  option,
  selectedOption,
  handleOptionSelect,
}: {
  option: CheckboxOption;
  selectedOption: string;
  handleOptionSelect: (option: string) => void;
}) => {
  const isSelectedOption = selectedOption === option.title;

  return (
    <div
      className="flex gap-2 items-center w-[170px] md:w-[250px] mx-auto ml-[15%] md:ml-auto cursor-pointer"
      onClick={() => handleOptionSelect(option.title)}
    >
      <div className="min-w-[20px] min-h-[20px] rounded-full border-[1px] border-white flex items-center justify-center">
        {isSelectedOption && (
          <motion.div
            className="min-w-[10px] min-h-[10px] bg-white rounded-full"
            whileInView={{ opacity: [0, 1] }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </div>

      <div
        className={cn(
          "uppercase text-[12px] italic py-2 px-2 rounded-full transition-all duration-700",
          isSelectedOption && "bg-white text-black px-4"
        )}
      >
        {option.title}
      </div>
    </div>
  );
};

export default Checkbox;
