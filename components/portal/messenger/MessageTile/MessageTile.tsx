import { cn } from "@/app/lib/utils";
import { MessageType } from "@/types";
import React from "react";

const MessageTile = ({
  _id,
  content,
  sender,
  isClient,
  isRead,
  isDeleted,
  isImage,
  date,
}: MessageType) => {
  return (
    <div
      className={cn(
        "border border-1-white p-2 rounded-md ml-auto max-w-[80%] flex flex-col text-clip",
        isClient && "bg-white text-black mr-auto ml-0"
      )}
    >
      <h5 className="text-[8px] italic">{sender}</h5>
      <p className="text-[10px] h-100 text-clip">{content}</p>
    </div>
  );
};

export default MessageTile;
