'use client'

import { Metadata } from "next/types";
import React from "react";

import Contact from "@/components/booking/Contact";
import PageHeading from "@/components/headings/PageHeading";
import ViewMotionWrapper from "@/components/layout/Motion/ViewMotionWrapper";

const ContactPage = () => {
  return (
    <div className="w-screen h-[100vh] lg:max-h-screen flex flex-col items-center overflow-hidden">
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
