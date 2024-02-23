"use client";
import React from "react";
import { Asterisk } from "lucide-react";

import PortalLinkList from "../../PortalLinkList/PortalLinkList";

const PostAppointment = ({ data }) => {
  return (
    <div className="w-[60%]">
      <header className="text-center flex flex-col items-center gap-4 mb-10">
        <h1 className="title tracking-wide">Thank you for your patronage</h1>
        <Asterisk size={10} />
      </header>
      <div className="h-[25%] min-w-[45%] md:min-w-[20%] flex items-center">
        <PortalLinkList links={data} />
      </div>
    </div>
  );
};

export default PostAppointment;
