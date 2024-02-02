import React, { useState } from "react";
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
      className="flex gap-2 items-center w-[150px] mx-auto"
      onClick={() => handleOptionSelect(option.title)}
    >
      <div className="min-w-[20px] min-h-[20px] rounded-full border-[1px] border-white flex items-center justify-center">
        {isSelectedOption && (
          <div className="min-w-[10px] min-h-[10px] bg-white rounded-full" />
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
