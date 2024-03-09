import React, { Fragment } from "react";

import { useIndemnity } from "@/context/IndemnityContext";

import IndemnityTile from "./IndemnityTile";

const IndemnityList: React.FC = () => {
  const { indemnityClauses } = useIndemnity();
  
  return (
    <Fragment>
      {indemnityClauses.map((clause, i) => (
        <IndemnityTile clause={clause} key={i} />
      ))}
    </Fragment>
  );
};

export default IndemnityList;
