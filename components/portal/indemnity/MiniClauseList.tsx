import React from "react";

import { useIndemnity } from "@/context/IndemnityContext";

import MiniIndemnityClause from "./MiniIndemnityClause";

interface MiniClauseListProps {
  isChecked: boolean
}

const MiniClauseList: React.FC<MiniClauseListProps> = ({ isChecked }) => {
  const { miniIndemnityClauses: miniClauses } = useIndemnity();
  return (
    <div className="flex flex-col gap-2 px-4 lg:pb-4 pb-20 lg:h-[unset] h-[178px] lg:overflow-[unset] overflow-auto">
      {miniClauses.map((clause, i) => (
        <MiniIndemnityClause clause={clause} key={i} isChecked = {isChecked} />
      ))}
    </div>
  );
};

export default MiniClauseList;
