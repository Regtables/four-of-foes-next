import React from "react";

import { MiniIndemnityClauseType } from "@/types";
import { useIndemnity } from "@/context/IndemnityContext";
import { cn } from "@/app/lib/utils";

interface MiniIndemnityClauseProps {
  clause: MiniIndemnityClauseType;
  isChecked: boolean
}

const MiniIndemnityClause: React.FC<MiniIndemnityClauseProps> = ({
  clause,
  isChecked
}) => {
  const checked = clause.consentGiven;

  const { handleMiniClauseCheck: handleCheck } = useIndemnity();

  return (
    <div className="flex gap-2 items-center">
      <div
        className={cn("min-h-3 min-w-3 h-[13px] w-[13px] rounded-full border-[1px] border-white flex justify-center items-center cursor-pointer", isChecked && 'border-black')}
        onClick={() => handleCheck(clause)}
      >
        {checked && <div className={cn("h-[7px] w-[7px] m-auto bg-white rounded-full", isChecked && 'bg-black' )}/>}
      </div>

      <h4 className="text-[10px]">{clause.clause}</h4>
    </div>
  );
};

export default MiniIndemnityClause;
