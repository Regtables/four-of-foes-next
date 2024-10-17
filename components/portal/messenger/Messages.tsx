import React, { useEffect, useRef } from "react";

import { useMessenger } from "@/context/MessengerContext";

import MessageTile from "./MessageTile";
import { useSection } from "@/context/PortalSectionContext";

const Messages = () => {
  const { messageHistory, isAdmin } = useMessenger();

  return (
    <div className="flex flex-col gap-4 pb-4 px-2 py-2 h-full">
      {/*@ts-ignore */}
      {!isAdmin && (
        <MessageTile
          _id="1"
          i = {0}
          createdAt={new Date()}
          isFromClient={false}
          content="This creative space is provided to discuss design alterations and consultation. Please use it respectfully and trust the artistic process of the artist."
        />
      )}
      {messageHistory
      // @ts-ignore
        .sort((a, b) => new Date(b.createdAt - new Date(a.createdAt)))
        .map((message, i) => (
          <MessageTile
            _id={message._id}
            isLive={message.isLive}
            sender={message.sender}
            isFromClient={message.isFromClient}
            readBy={message.readBy}
            image={message.image}
            createdAt={message.createdAt}
            content={message.content}
            key={i}
            i={i+1}
            isSent={message.isSent}
            hasError={message.hasError}
          />
        ))}
    </div>
  );
};

export default Messages;
