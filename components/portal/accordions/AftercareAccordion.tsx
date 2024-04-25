import React from "react";

import { AftercareType } from "@/types";

import AccordionLayout from "../layout/AccordionLayout";
import PortalAftercare from "../aftercare/PortalAftercare";

const AftercareAccordion: React.FC<{ data: AftercareType[]}> = ({ data }) => {
  return (
    <AccordionLayout title="aftercare" section={1} list post>
      <PortalAftercare data={data} />
    </AccordionLayout>
  );
};

export default AftercareAccordion;
