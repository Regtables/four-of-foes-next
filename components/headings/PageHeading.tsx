"use client";

import React from "react";
import { motion } from "framer-motion";

const PageHeading = () => {
  return (
    <header
      className="text-center"
      // whileInView={{ y: [10, 0], opacity: [0, 1] }}
      // initial={{ y: 10, opacity: 0 }}
      // transition={{ duration: 0.5 }}
    >
      <h1 className="uppercase font-[500] text-[32px] leading-0 text-[var(--font-heading)] heading-font">
        Four of Foes
      </h1>
      {/* <p className="text-[8px] tracking-[0.2em] font-light mt-4 mb-6">
        To give anything less than your best is to sacrifice the gift
      </p> */}
    </header>
  );
};

export default PageHeading;
