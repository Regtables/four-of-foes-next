'use client'

import React from "react";
import { Triangle } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
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

export default Loading;
