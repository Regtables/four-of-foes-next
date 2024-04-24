"use client";

import React from "react";

import Messages from "./Messages";
import MessageInput from "./MessageInput";

const PortalMessenger:React.FC = () => {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-[0.95] w-full h-[65vh] max-h-[65vh] overflow-auto pb-4">
        <Messages />
      </div>

      <div className="flex-[0.05] p-2">
        <MessageInput />
      </div>
    </div>
  );
};

export default PortalMessenger;
