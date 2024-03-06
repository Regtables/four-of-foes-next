import React from "react";
import AccordionLayout from "../layout/AccordionLayout";
import { AftercareType } from "@/types";
import ViewMotionWrapper from "@/components/layout/Motion/ViewMotionWrapper";
import AftercareAccordionTile from "../aftercare/AftercareAccordionTile/AftercareAccordionTile";

const AftercareAccordion: React.FC<{ data: AftercareType[]}> = ({ data }) => {
  // console.log(data[0], 'aftercare data')
  const handleDownload = async () => {
    try{
      const res = await fetch('/api/portal/downloads/aftercare')
      const blob = await res.blob() 

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'poets cxrner aftercare guide.jpeg';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

    } catch (error){
      console.log(error)
    }
  }

  return (
    <AccordionLayout title="aftercare" section={1} list>
      <div className="w-[80%] lg:w-[60vw] mx-auto display flex flex-col gap-6 items-center justify-center">
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

        <button className="text-center cursor-pointer text-[8px] uppercase tracking-[0.4em] text-[#a9a9a9]" onClick={handleDownload}>
          Download aftercare guide
        </button>
      </div>
    </AccordionLayout>
  );
};

export default AftercareAccordion;
