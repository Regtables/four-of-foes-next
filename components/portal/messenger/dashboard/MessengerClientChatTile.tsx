"use client";

import React, { useMemo, useState, useEffect } from "react";
import { CheckCheck } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { ClientType, Message } from "@/types";
import { cn } from "@/app/lib/utils";
import { readMessages } from "@/app/lib/actions/messages/messagesApi";

const MessengerClientChatTile = ({ client }: { client: ClientType }) => {
  const [unreadMessages, setUnreadMessages] = useState<Message[]>([]);
  const lastMessage =
    client.chat?.length > 0 ? client?.chat[client?.chat?.length - 1] : null;
  const pathname = usePathname();

  const isActive = pathname.includes(client._id);

  const unreadMessagesData = useMemo(() => {
    return client?.chat?.filter(
      (chat) =>
        chat?.readBy?.includes("client") && !chat?.readBy.includes("admin")
    );
  }, [client.chat]);
  
  useEffect(() => {
    if(!isActive){
      setUnreadMessages(unreadMessagesData);
    } else {
      // setUnreadMessages([])
    }
  }, [unreadMessagesData]);


  const handleChatItemClick = async () => {
    if(unreadMessages.length > 0){
      readMessages(unreadMessages, true)
    }
  }

  return (
    <Link href={`/portal/messenger-dashboard/${client._id}`}>
      <div
        className={cn(
          "h-full border-b-[1px] border-[grey] min-h-[70px] flex justify-between items-center p-2 cursor-pointer hover:bg-[#444444] hover:rounded-md transition-all duration-500",
          isActive && "bg-white text-black rounded-md"
        )}
        onClick={handleChatItemClick}
      >
        <div className="flex flex-col h-full justify-between">
          <div className="flex items-end gap-2">
            <h3 className="uppercase text-[14px] font-semibold tracking-wide">
              {client.clientName}
            </h3>
            <p className="text-[9px] italic text-[#686868]">
              {client?.appointmentDetails?.appointmentCity}
            </p>
          </div>

          {lastMessage && (
            <div className="text-[10px] flex items-center gap-1">
              {/* <CheckCheck size={10} /> */}
              {lastMessage.isFromClient
                ? lastMessage.sender?.clientName
                : "You"}
              : {lastMessage.content ? lastMessage.content : "(image)"}
              <CheckCheck size={10} />
            </div>
          )}
        </div>

        {unreadMessages?.length > 0 && (
          <div className={cn("text-[10px] h-6 w-6 rounded-full flex items-center justify-center bg-white text-black font-medium", isActive && 'bg-black text-white')}>
            {unreadMessages.length}
          </div>
        )}
      </div>
    </Link>
  );
};

export default MessengerClientChatTile;
