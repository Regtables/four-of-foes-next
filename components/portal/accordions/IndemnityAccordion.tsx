import React from "react";

import { ClientIndemnityType, IndemnityType, MiniIndemnityClauseType } from "@/types";

import AccordionLayout from "../layout/AccordionLayout";
import PortalIndemnityForm from "../sections/PortalIndemnityForm";
import { IndemnityProvider } from "@/context/IndemnityContext";

interface IndemnityAccordionProps {
  indemnityClauses: IndemnityType[];
  miniIndemnityClauses: MiniIndemnityClauseType[];
  clientIndemnity: ClientIndemnityType
}

const IndemnityAccordion: React.FC<IndemnityAccordionProps> = ({
  indemnityClauses,
  miniIndemnityClauses,
  clientIndemnity
}) => {
  // if(!indemnityClauses || !clientIndemnity) return null
  return (
    <AccordionLayout title="indemnity" section={1} list>
      <IndemnityProvider 
        indemnityClauses={indemnityClauses} 
        miniIndemnityClauses={miniIndemnityClauses} 
        clientIndemnity={clientIndemnity}
      >
        <PortalIndemnityForm />
      </IndemnityProvider>
    </AccordionLayout>
  );
};

export default IndemnityAccordion;
