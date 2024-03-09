import { cn } from "@/app/lib/utils";
import React from "react";

interface ButtonPillProps {
  text: string;
  fill?: boolean;
  handleClick?: any;
  type?: 'submit' | 'button',
  disabled?: boolean
}

const ButtonPill = ({ text, fill, handleClick, type = 'button', disabled }: ButtonPillProps) => {
  return (
    <button
      className={`${cn(
        `border border-1-white w-full h-full rounded-full uppercase text-[8px] tracking-[0.4em] font-[500] transition-colors duration-1000`,
        fill && "bg-white text-black"
      )}`}
      onClick={handleClick}
      type = {type}
      disabled = {disabled}
    >
      {text}
    </button>
  );
};

export default ButtonPill;
