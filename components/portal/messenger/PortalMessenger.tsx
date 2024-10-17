"use client";

import React from "react";

import Messages from "./Messages";
import MessageInput from "./MessageInput";

const PortalMessenger:React.FC = () => {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-[0.95] w-full lg:h-[70vh] lg:max-h-[70vh] h-[55vh] max-h-[60vh] overflow-auto pb-4">
        <Messages />
      </div>

      <div className="flex-[0.05] p-2">
        <MessageInput />
      </div>
    </div>
  );
};

export default PortalMessenger;
