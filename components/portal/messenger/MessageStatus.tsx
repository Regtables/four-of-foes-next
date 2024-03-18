import React from "react";

import { useMessenger } from "@/context/MessengerContext";
import { Puff } from "react-loader-spinner";
import { CheckCheck } from "lucide-react";

const MessageStatus = ({
  isLast,
  isSent,
  hasError
}: {
  isLast: boolean;
  isSent: boolean;
  hasError: boolean;
}) => {
  const { isSending } = useMessenger();

  return (
    <div>
      {isSending && isLast && !hasError ? (
        <Puff
          visible={isSending}
          height='10'
          width="10"
          color="black"
          ariaLabel="rotating-lines-loading"
        />
      ) : (
        <CheckCheck size={10} />
      )}
      {hasError && "x"}
    </div>
  );
};

export default MessageStatus;
