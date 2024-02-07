import { cn } from "@/app/lib/utils";
import React from "react";

interface ButtonPillProps {
  text: string;
  fill?: boolean;
  handleClick?: any;
  type?: 'submit' | 'button'
}

const ButtonPill = ({ text, fill, handleClick, type = 'button' }: ButtonPillProps) => {
  return (
    <button
      className={`${cn(
        `border border-1-white w-full h-full rounded-full uppercase text-[10px] tracking-[0.4em] font-[500]`,
        fill && "bg-white text-black"
      )}`}
      onClick={handleClick}
      type = {type}
    >
      {text}
    </button>
  );
};

export default ButtonPill;
