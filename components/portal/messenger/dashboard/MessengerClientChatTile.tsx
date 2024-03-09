import Link from "next/link";
import React from "react";
import { CheckCheck } from "lucide-react";
import { usePathname } from "next/navigation";

import { ClientType } from "@/types";
import { cn } from "@/app/lib/utils";

const MessengerClientChatTile = ({ client }: { client: ClientType }) => {
  const lastMessage =
    client.chat?.length > 0
      ? client.chat[client.chat?.length - 1]?.content
      : null;
  const pathname = usePathname();

  const isActive = pathname.includes(client._id);

  return (
    <Link href={`/portal/messenger-dashboard/${client._id}`}>
      <div
        className={cn(
          "h-full border-b-[1px] border-[grey] min-h-[70px] p-2 cursor-pointer hover:bg-[#444444] transition-all duration-500",
          isActive && "bg-white text-black rounded-md"
        )}
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
              <CheckCheck size={10} />
              {lastMessage}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default MessengerClientChatTile;
