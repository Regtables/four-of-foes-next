"use client";

import Contact from "@/components/booking/Contact";
import PageHeading from "@/components/headings/PageHeading";
import ViewMotionWrapper from "@/components/layout/Motion/ViewMotionWrapper";
import React from "react";

const ContactPage = () => {
  return (
    <div className="w-screen h-[100vh] lg:max-h-screen flex flex-col items-center overflow-hidden">
      {/* <h2 className='booking_title text-center mb-14 flex flex-col items-center justify-center'>Contact</h2> */}
      <ViewMotionWrapper className="mt-8" duration={1}>
        <PageHeading />
      </ViewMotionWrapper>

      <ViewMotionWrapper delay={0.3} duration={1}>
        <Contact page />
      </ViewMotionWrapper>
    </div>
  );
};

export default ContactPage;
