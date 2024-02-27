import React from "react";
import { Camera, Send, Smile } from "lucide-react";

const MessageInput = () => {
  return (
    <div className="flex items-center w-full gap-2">
      <div>
        <Camera color="var(--color-white-light)" />
      </div>

      <div className="flex border border-[var(--color-white-light)] border-1 rounded-full p-[7px] flex-grow items-center justify-between">
        <div className="flex gap-2" >
          <Smile className="w-5 h-5"color="var(--color-white-light)" />
          <input className="bg-transparent border-none outline-none text-[10px] w-full" placeholder="Message..." />
        </div>

        <div>
          <Send className="w-5 h-5" color="var(--color-white-light)"/>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
