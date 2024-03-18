"use client";

import axios from "axios";
import { createContext, useContext, useState } from "react";

import { ClientType, Message } from "@/types";
import { useModal } from "./ModalContext";

interface MessengerContextProps {
  messageHistory: Message[];
  setMessageHistory: (messages: Record<string, Message>) => void;
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSend: (e: React.FormEvent) => Promise<void>;
  handleUpload: (e: any) => Promise<void>;
  isSending: boolean,
  isAdmin: boolean
}

interface MessengerProviderProps {
  messageHistory: Message[];
  isAdmin: boolean,
  children: React.ReactNode;
  client: ClientType;
}

const MessengerContext = createContext<MessengerContextProps | undefined>(undefined);

export const MessengerProvider: React.FC<MessengerProviderProps> = ({
  messageHistory: messages,
  children,
  client,
  isAdmin
}) => {
  const [messageHistory, setMessageHistory] = useState<Record<string, Message>>(
    messages.reduce((acc: any, message: Message) => {
      if (message._id) {
        acc[message._id] = message;
      }
      return acc;
    }, {})
  );
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false)

  const { handleActionErrorAlertOpen } = useModal()

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSending(true)

    const message: Message = {
      content: newMessage,
      createdAt: new Date(),
      sender: isAdmin ? undefined : client,
      isFromClient: isAdmin ? false : true,
      isLive: true,
      isSent: false,
      hasError: false
    };

    setMessageHistory(prevMessages => ({
      ...prevMessages,
      [message.createdAt.toString()]: message
    }));
    setNewMessage('')

    try {
      const res = await axios.post(
        "/api/portal/messenger/",
        { content: newMessage, isAdmin, clientId: client._id },
        { withCredentials: true }
      );

      if (res.status === 200) {
        const { message: serverMessage } = res.data;

        setMessageHistory(prevMessages => {
          const {[message.createdAt.toString()]: _, ...restMessages } = prevMessages

          return {
            ...restMessages,
            [message.isLive ? message.createdAt.toString() : serverMessage._id]: {
              ...serverMessage,
              sender: client,
              createdAt: serverMessage.createdAt
            }
          }
        })
        setIsSending(false)
      }
    } catch (error) {
      console.log(error);

      setMessageHistory(prevMessages => ({
        ...prevMessages,
        [message.createdAt.toString()]: {
          ...prevMessages[message.createdAt.toString()],
          hasError: true
        }
      }))

      handleActionErrorAlertOpen('trying to send your message')
    }
  };

  const handleUpload = async (e: any) => {
    try{
      const uploadedImage = e.target.files[0];
      if (
        uploadedImage.type === "image/jpeg" ||
        uploadedImage.type === "image/png" ||
        uploadedImage.type === "image/webp"
      ) {  
  
        const message: Message = {
          sender: client,
          isFromClient: true,
          image: URL.createObjectURL(uploadedImage),
          content: "",
          createdAt: new Date(),
          isLive: true,
          _type: "message",
          isSent: true
        };
  
        setMessageHistory(prevMessages => ({
          ...prevMessages,
          [message.createdAt.toString()]: message
        }));
  
        const formData = new FormData();
  
        formData.append("image", uploadedImage, uploadedImage.name);

  
        await axios.post("/api/portal/messenger/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        // await fetch('/api/portal/messenger/upload', {
        //   method: 'POST',
        //   body: formData
        // })
      } else {
        //alert
      }
    } catch (error){
      console.log(error)
    }
  };

  const value = {
    messageHistory: Object.values(messageHistory),
    setMessageHistory,
    newMessage,
    setNewMessage,
    handleSend,
    handleUpload,
    isSending,
    isAdmin
  }

  return (
    <MessengerContext.Provider value={value}>
      {children}
    </MessengerContext.Provider>
  );
};

export const useMessenger = () => {
  const context = useContext(MessengerContext);

  if (!context) {
    throw new Error("useMessenger must be used within MessengerProvider");
  }

  return context;
};
