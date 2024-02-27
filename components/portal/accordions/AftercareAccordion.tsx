import React from "react";
import AccordionLayout from "../layout/AccordionLayout";
import { AftercareType } from "@/types";
import ViewMotionWrapper from "@/components/layout/Motion/ViewMotionWrapper";
import AftercareAccordionTile from "../aftercare/AftercareAccordionTile/AftercareAccordionTile";

const AftercareAccordion: React.FC<{ data: AftercareType[]}> = ({ data }) => {
  // console.log(data[0], 'aftercare data')
  return (
    <AccordionLayout title="aftercare" section={1}>
      <div className="w-[80%] mx-auto display flex flex-col gap-6 items-center justify-center">
        <p className="text-[9px] text-center tracking-[--letter-spacing-sm]">
          Please read through our indemnity clauses, after which you can provide
          consent by agreeing and submitting the form
        </p>

        <div className="flex flex-col gap-2">
          {data?.map((tip, i) => (
            <ViewMotionWrapper>
              <AftercareAccordionTile item={tip as AftercareType} />
            </ViewMotionWrapper>
          ))}
        </div>

        <div className="title">Happy Healing!</div>
      </div>
    </AccordionLayout>
  );
};

export default AftercareAccordion;
