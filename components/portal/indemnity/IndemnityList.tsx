import React, { Fragment } from "react";

import { useIndemnity } from "@/context/IndemnityContext";

import IndemnityTile from "./IndemnityTile";
import ViewMotionWrapper from "@/components/layout/Motion/ViewMotionWrapper";

const IndemnityList: React.FC = () => {
  const { indemnityClauses } = useIndemnity();
  
  return (
    <Fragment>
      {indemnityClauses.map((clause, i) => (
        <ViewMotionWrapper y = {20} delay={i*0.1} duration={1}>
          <IndemnityTile clause={clause} key={i} />
        </ViewMotionWrapper>
      ))}
    </Fragment>
  );
};

export default IndemnityList;
