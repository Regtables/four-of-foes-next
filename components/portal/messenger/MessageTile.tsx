import React, { useEffect, useMemo } from "react";
import moment from 'moment'

import { cn } from "@/app/lib/utils";
import { Message} from "@/types";
import { urlFor } from "@/app/lib/sanity";
import { useMessenger } from "@/context/MessengerContext";

import MessageStatus from "./MessageStatus";
import ViewMotionWrapper from "@/components/layout/Motion/ViewMotionWrapper";

interface MessageTileProps extends Message {
  i: number
}

const MessageTile: React.FC<MessageTileProps> = ({
  _id,
  content,
  sender,
  isFromClient,
  readBy,
  image,
  createdAt,
  isSent,
  hasError,
  isLive,
  i
}: Message) => {
  const { messageHistory, isAdmin } = useMessenger()

  const facing =  ((isAdmin && !isFromClient) || (!isAdmin && isFromClient))
  
  const imageStyles = 'w-full h-full max-h-[300px] rounded-md'

  const isLast = useMemo(() => {
    return i === messageHistory.length-1
  }, [messageHistory])

  useEffect(() => {
    document.getElementById('last')?.scrollIntoView()
  }, [])

  const renderFrom = () => {
    if(_id === '1'){
      return 'Admin'
    } else if(isFromClient){
      return sender!.clientName
    } else {
      return 'Ted'
    }
  }

  const renderMessage = () => {
    if(image){
      if(isLive){
        return (
          <img src = {image} className={imageStyles} />
        )
      } else {
        return (
          <img src = {urlFor(image).url()} className= {imageStyles} />
        )
      }
    } else {
      return (
        <p className="text-[10px] h-100 ">{content}</p>
      )
    }
  }

  return (
    <ViewMotionWrapper className={cn("flex items-end gap-[3px]", (!facing) && 'flex-row-reverse')} duration={1} once>
      <div
        className={cn(
          "border border-1-white py-[5px] px-[5px] rounded-md max-w-[80%] flex flex-col min-w-[50px] items-end mx-[4px] ",
          facing && "bg-white text-black ml-0 items-start"
        )}
        id= {isLast ? 'last' : ''}
      >
        <h5 className="text-[8px] italic mb-[3px]">{renderFrom()}</h5>
        
        <div className={cn("flex justify-between w-full items-end", !facing && 'flex-row-reverse', image && 'flex-col items-end')}>
          {renderMessage()}

          <div className={cn('ml-2', !facing && 'mr-2 ml-0', image && 'mr-0 ml-0 mt-2', _id === '1' && 'mt')}>
            <MessageStatus isLast = {isLast} isSent = {isSent!} hasError = {hasError!} />
          </div>
        </div>
      </div>

      {isSent && (
        <ViewMotionWrapper className="text-[7px]" duration={1} y = {0}>
          {moment(createdAt).calendar()}
        </ViewMotionWrapper>
      )}
    </ViewMotionWrapper>
  );
};

export default MessageTile;
