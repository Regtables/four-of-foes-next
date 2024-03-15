import React from "react";

import { useMessenger } from "@/context/MessengerContext";
import { RotatingLines } from "react-loader-spinner";
import { Check } from "lucide-react";

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
        <RotatingLines
          visible={isSending}
          width="10"
          strokeColor="black"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
        />
      ) : (
        <Check size={10} />
      )}
      {hasError && "x"}
    </div>
  );
};

export default MessageStatus;
