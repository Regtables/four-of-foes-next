import React from "react";

import { MessageType } from "@/types";
import MessageTile from "../MessageTile/MessageTile";

const Messages = ({ messages }: { messages: MessageType[] }) => {
  return (
    <div className="flex flex-col gap-4">
      {messages.map((message, i) => (
        <MessageTile
          _id={message._id}
          sender={message.sender}
          isClient={message.isClient}
          isDeleted={message.isDeleted}
          isRead={message.isRead}
          isImage={message.isImage}
          date={message.date}
          content= {message.content}
        />
      ))}
    </div>
  );
};

export default Messages;
