import React, { ChangeEvent } from "react";
import { Camera, Send, Smile } from "lucide-react";
import { useMessenger } from "@/context/MessengerContext";

const MessageInput: React.FC = () => {
  const { handleSend, handleUpload, setNewMessage, newMessage } = useMessenger()

  return (
    <form className="flex items-center w-full gap-2" onSubmit={handleSend}>
      <label className="h-0 max-w-[40px] flex items-center">
        <input
          name="image"
          id="image"
          type="file"
          className="h-0 w-0"
          onChange={(e) => handleUpload(e)}
        />
        <Camera color="var(--color-white-light)" />
      </label>

      <div className="flex border border-[var(--color-white-light)] border-1 rounded-full p-[7px] flex-grow items-center justify-between">
        <div className="flex gap-2 w-full">
          <Smile className="w-5 h-5" color="var(--color-white-light)" />

          <input
            className="bg-transparent border-none outline-none text-[10px] flex-grow"
            placeholder="Message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
        </div>

        <button type="submit">
          <Send className="w-5 h-5" color="var(--color-white-light)" />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
