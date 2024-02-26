import React, { ChangeEvent, Dispatch, SetStateAction } from "react";

import ViewMotionWrapper from "../layout/Motion/ViewMotionWrapper";

const Idea = ({ idea, setIdea } : { idea: string, setIdea: (value: string) => Dispatch<SetStateAction<string>>}) => {
  return (
    <ViewMotionWrapper y={10} delay={0.2}>
      <textarea
        className="bg-transparent outline-none border-[1px] border-white w-full rounded-md p-2 tracking-[0.2em] font-[var(--font-family)] font-meduim italic text-[16px]"
        rows={10}
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
    
      ></textarea>
    </ViewMotionWrapper>
  );
};

export default Idea;
