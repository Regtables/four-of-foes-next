import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { CheckboxOption } from "@/types";
import { cn } from "@/app/lib/utils";

import Checkbox from "./Checkbox";

const CheckboxList = ({
  options,
  selectedOption,
  handleOptionSelect,
  single,
  artist
}: {
  options: CheckboxOption[];
  selectedOption: string;
  handleOptionSelect: (option: string) => void;
  single?: boolean,
  artist?: boolean
}) => {
  const [animateOption, setAnimateOption] = useState({}) 

  useEffect(() => {
    if(artist){
      setAnimateOption({ opacity: 0 })
  
      setTimeout(() => {
        setAnimateOption({ opacity: 1 })
      }, 500);
    }
  }, [options])

  return (
    <div className={cn(`grid grid-cols-2 gap-4 md:w-[80%] w-full mx-auto`, single && 'grid-cols-1')}>
      {options.map((option, i) => (
        <motion.div
          className="flex"
          whileInView= { !artist ? { opacity: [0, 1], x: i%2 === 0 ? [-10, 0] : [10, 0]} : {} }
          animate = { artist ? animateOption : {} }
          initial={ !artist ? { opacity: 0, x: i%2 ? -10 : 10 } : {} }
          key = {i}
          transition={{ duration: 0.3, delay: i*0.07 }}
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
