import React from "react";

import AccordionLayout from "../layout/AccordionLayout";
import PortalFeedback from "../feedback/PortalFeedback";

export interface PortalFeedbackProps {
  data: {
    rating: number,
    review: string
  }
}

const FeedbackAccordion: React.FC<PortalFeedbackProps> = ({ data }) => {
  return (
    <AccordionLayout title="feedback" section={3} list post>
      <PortalFeedback data={data} />
    </AccordionLayout>
  );
};

export default FeedbackAccordion;
