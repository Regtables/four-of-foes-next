"use client";

import axios from "axios";
import { createContext, useContext, useMemo, useState } from "react";

import { ClientType, Message } from "@/types";
import { useModal } from "./ModalContext";

interface MessengerContextProps {
  messageHistory: Message[];
  unreadMessages: Message[];
  setMessageHistory: (messages: Record<string, Message>) => void;
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSend: (e: React.FormEvent) => Promise<void>;
  handleUpload: (e: any) => Promise<void>;
  isSending: boolean;
  isAdmin: boolean;
}

interface MessengerProviderProps {
  messageHistory?: Message[];
  isAdmin: boolean;
  children: React.ReactNode;
  client: ClientType;
}

const MessengerContext = createContext<MessengerContextProps | undefined>(
  undefined
);

export const MessengerProvider: React.FC<MessengerProviderProps> = ({
  messageHistory: messages,
  children,
  client,
  isAdmin,
}) => {
  const [messageHistory, setMessageHistory] = useState<Record<string, Message>>(
    messages?.reduce((acc: any, message: Message) => {
      if (message?._id) {
        acc[message?._id] = {
          ...message,
          // readby: [...message.readBy!, isAdmin ? 'admin' : 'client']
        };
      }
      return acc;
    }, {})
  );
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { handleActionErrorAlertOpen } = useModal();

  const unreadMessages = useMemo(() => {
    return Object.values(messageHistory)?.filter((chat) =>
      isAdmin
        ? chat?.readBy?.includes("client") && !chat?.readBy.includes("admin")
        : chat?.readBy?.includes("admin") && !chat?.readBy.includes("client")
    );
  }, [client, isAdmin]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSending(true);

    const message: Message = {
      content: newMessage,
      createdAt: new Date(),
      sender: isAdmin ? undefined : client,
      isFromClient: isAdmin ? false : true,
      isLive: true,
      isSent: false,
      hasError: false,
      readBy: [isAdmin ? "admin" : "client"],
    };

    setMessageHistory((prevMessages) => ({
      ...prevMessages,
      [message.createdAt.toString()]: message,
    }));
    setNewMessage("");

    try {
      const res = await axios.post(
        "/api/portal/messenger/",
        { content: newMessage, isAdmin, clientId: client._id },
        { withCredentials: true }
      );

      if (res.status === 200) {
        const { message: serverMessage } = res.data;

        setMessageHistory((prevMessages) => {
          const { [message.createdAt.toString()]: _, ...restMessages } =
            prevMessages;

          console.log(prevMessages[message.createdAt.toString()]);

          return {
            ...restMessages,
            [message.isLive ? message.createdAt.toString() : serverMessage._id]:
              {
                ...serverMessage,
                sender: client,
                createdAt: serverMessage.createdAt,
                readBy: serverMessage.readBy,
              },
          };
        });
        setIsSending(false);
      }
    } catch (error) {
      console.log(error);

      setMessageHistory((prevMessages) => ({
        ...prevMessages,
        [message.createdAt.toString()]: {
          ...prevMessages[message.createdAt.toString()],
          hasError: true,
        },
      }));

      handleActionErrorAlertOpen("trying to send your message");
      setIsSending(false);
    }
  };

  const handleUpload = async (e: any) => {
    setIsSending(true);
    const uploadedImage = e.target.files[0];
    if (
      uploadedImage.type === "image/jpeg" ||
      uploadedImage.type === "image/png" ||
      uploadedImage.type === "image/webp"
    ) {
      const message: Message = {
        sender: isAdmin ? undefined : client,
        isFromClient: isAdmin ? false : true,
        image: URL.createObjectURL(uploadedImage),
        createdAt: new Date(),
        isLive: true,
        isSent: false,
        hasError: false,
        readBy: [isAdmin ? "admin" : "client"],
      };

      setMessageHistory((prevMessages) => ({
        ...prevMessages,
        [message.createdAt.toString()]: message,
      }));

      const formData = new FormData();

      formData.append("image", uploadedImage, uploadedImage.name);
      formData.append("isAdmin", isAdmin.toString());
      formData.append("clientId", client._id);

      try {
        const res = await axios.post("/api/portal/messenger/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (res.status === 200) {
          const { message: serverMessage } = res.data;

          setMessageHistory((prevMessages) => {
            const { [message.createdAt.toString()]: _, ...restMessages } =
              prevMessages;

            return {
              ...restMessages,
              [message.isLive
                ? message.createdAt.toString()
                : serverMessage._id]: {
                ...serverMessage,
                sender: client,
                createdAt: serverMessage.createdAt,
              },
            };
          });

          setIsSending(false);
        }
      } catch (error) {
        console.log(error);
        handleActionErrorAlertOpen("trying to upload your image");

        setMessageHistory((prevMessages) => ({
          ...prevMessages,
          [message.createdAt.toString()]: {
            ...prevMessages[message.createdAt.toString()],
            hasError: true,
          },
        }));

        setIsSending(false);
      }
    } else {
      //alert
    }
  };

  const readMessages = () => {

  }
 
  const value = {
    messageHistory: Object.values(messageHistory),
    unreadMessages,
    setMessageHistory,
    newMessage,
    setNewMessage,
    handleSend,
    handleUpload,
    isSending,
    isAdmin,
  };

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
