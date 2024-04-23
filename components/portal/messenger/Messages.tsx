import React from "react";

import { useMessenger } from "@/context/MessengerContext";

import MessageTile from "./MessageTile";

const Messages = () => {
  const { messageHistory, isAdmin } = useMessenger()

  return (
    <div className="flex flex-col gap-4 pb-4 px-2 py-2 h-[100%]">
      {/*@ts-ignore */}
      {!isAdmin && (
        <MessageTile
             _id= "1"
             i = {0}
             isFromClient= {false}
             createdAt={new Date()}
             content = "Please use this space to discuss changes and addisional ideas. Here you may also recieve designs. Please use it respectfully and trust the process."
          />
      )}
      {/* @ts-ignore */}
      {messageHistory.sort((a,b) => new Date(b.createdAt - new Date(a.createdAt)))
      .map((message, i) => (
        <MessageTile
          _id={message._id}
          isLive = {message.isLive}
          sender={message.sender}
          isFromClient={message.isFromClient}
          readBy={message.readBy}
          image={message.image}
          createdAt={message.createdAt}
          content= {message.content}
          key={i}
          i= {i}
          isSent = {message.isSent}
          hasError = {message.hasError}
        />
      ))}
    </div>
  );
};

export default Messages;
