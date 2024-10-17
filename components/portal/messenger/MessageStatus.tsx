import React from "react";

import { useMessenger } from "@/context/MessengerContext";
import { Puff } from "react-loader-spinner";
import { CheckCheck, X } from "lucide-react";

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

  const renderStatus = () => {
    if(isSending && isLast && !hasError){
      return (
        <Puff
        visible={isSending}
        height='10'
        width="10"
        color="black"
        ariaLabel="rotating-lines-loading"
      />
      )
    } else if(isSent && !hasError){
      return (
        <CheckCheck size={10} />
      )
    } else if(hasError){
      return (
        <X size={10}/>
      )
    }
  }

  return (
    <div>
      {renderStatus()}
    </div>
  );
};

export default MessageStatus;
