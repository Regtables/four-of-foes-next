"use client";

import React, { useState, useRef } from "react";
import { Check, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";

import { IndemnityType } from "@/types";
import { useIndemnity } from "@/context/IndemnityContext";
import { cn } from "@/app/lib/utils";

import MiniClauseList from "./MiniClauseList";

interface IndemnityTileProps {
  clause: IndemnityType;
}

const IndemnityTile: React.FC<IndemnityTileProps> = ({ clause }) => {
  const [toggle, setToggle] = useState(false);
  const [height, setHeight] = useState("0px");
  const content: any = useRef(null);

  const { handleClauseCheck } = useIndemnity()

  const checked = clause.consentGiven;

  const iconVariants = {
    toggle: { rotate: "180deg" },
    hidden: { rotate: "0deg" },
  };

  const handleToggle = (e: any) => {
    if(e.target.tagName !== 'svg' && e.target.tagName !== 'path'){
      if (!toggle) {
        setToggle(true);
        setHeight(`${content.current.scrollHeight}px`);
      } else {
        setToggle(false);
        setHeight("0px");
      }
    }
  };

  return (
    <div
      className={cn(
        "border-[1px] transition-all duration-700",
        toggle ? "rounded-[5px]" : "rounded-[20rem]",
        checked && "bg-white text-black"
      )}
    >
      <div
        className="flex px-4 items-center w-full h-[40px] cursor-pointer"
        onClick={handleToggle}
      >
        <motion.div
          variants={iconVariants}
          animate={toggle ? "toggle" : "hidden"}
          transition={{ duration: 0.5 }}
        >
          <ChevronUp size={15} />
        </motion.div>

        <h3 className="tracking-[0.2em] italic font-normal text-[11px] ml-4">
          {clause?.heading}
        </h3>

        <div
          className="h-[20px] w-[20px] border-[1px] border-white bg-black cursor-pointer rounded-full ml-auto flex items-center justify-center"
          onClick={() => handleClauseCheck(clause.id)}
          id = 'indemnity-check'
        >
          <Check size={12} color={checked ? "white" : "black"} />
        </div>
      </div>

      <div
        className="overflow-hidden transition-all duration-700"
        style={{ maxHeight: height }}
        ref={content}
      >
        <p className="px-4 pb-4 paragraph transistion-all duration-300">{clause.clause}</p>

        {clause.id === "health" && (
          <MiniClauseList isChecked = {checked} />
        )}
      </div>
    </div>
  );
};

export default IndemnityTile;
