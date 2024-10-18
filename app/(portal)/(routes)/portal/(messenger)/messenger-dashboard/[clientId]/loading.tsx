'use client'

import React from "react";
import { Triangle } from "react-loader-spinner";

const loading = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <Triangle
        visible={true}
        height="40"
        width="40"
        color="white"
        ariaLabel="triangle-loading"
      />
    </div>
  );
};

export default loading;
