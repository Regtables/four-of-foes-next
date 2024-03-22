import React from "react";

import { useIndemnity } from "@/context/IndemnityContext";

import IndemnityList from "../indemnity/IndemnityList";
import IndemnitySubmitButton from "../indemnity/IndemnitySubmitButton";
import IndemnityDateCaptured from "../indemnity/IndemnityDateCaptured";
import ViewMotionWrapper from "@/components/layout/Motion/ViewMotionWrapper";

const PortalIndemnityForm: React.FC = () => {
  const { indemnityDescription: description } = useIndemnity();

  return (
    <form className="w-[80%] lg:w-[60vw]">
      <p className="text-[9px] text-center tracking-[--letter-spacing-sm] pt-4">
        {description}
      </p>

      <div className="flex flex-col gap-2 pt-4">
        <IndemnityList />
      </div>

      <ViewMotionWrapper delay={0.8} duration={1}>
        <IndemnitySubmitButton />
      </ViewMotionWrapper>

      <ViewMotionWrapper delay={1} duration={1}>
        <IndemnityDateCaptured />
      </ViewMotionWrapper>
    </form>
  );
};

export default PortalIndemnityForm;
