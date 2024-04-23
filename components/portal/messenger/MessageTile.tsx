import React, { useEffect, useMemo } from "react";
import moment from 'moment'

import { cn } from "@/app/lib/utils";
import { Message} from "@/types";
import { urlFor } from "@/app/lib/sanity";
import { useMessenger } from "@/context/MessengerContext";

import MessageStatus from "./MessageStatus";
import ViewMotionWrapper from "@/components/layout/Motion/ViewMotionWrapper";
import { useModal } from "@/context/ModalContext";

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
  const { handleModalOpen } = useModal()

  const facing =  ((isAdmin && !isFromClient) || (!isAdmin && isFromClient))
  
  const imageStyles = 'w-full h-full max-h-[300px] rounded-md object-cover cursor-pointer'

  const isLast = useMemo(() => {
    return i === messageHistory.length
  }, [messageHistory])

  
  useEffect(() => {
    console.log(isLast)
    document.getElementById('last')!.scrollIntoView()
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
          <img src = {image} className={imageStyles} onClick = {() => handleModalOpen('imagePreview', { activeImage: image })} />
        )
      } else {
        return (
          <img src = {urlFor(image).url()} className= {imageStyles} onClick = {() => handleModalOpen('imagePreview', { activeImage: image })}/>
        )
      }
    } else {
      return (
        <p className="text-[10px] h-100 ">{content}</p>
      )
    }
  }

  return (
    <ViewMotionWrapper
      className={cn("flex items-end gap-[3px]", (!facing) && 'flex-row-reverse')} 
      y= {0} 
      duration={1}
      once
      >
      <div
        className={cn(
          "border border-1-white py-[5px] px-[5px] rounded-md max-w-[80%] flex flex-col min-w-[50px] items-end mx-[4px] ",
          facing && "bg-white text-black ml-0 items-start",
          image && 'border-none'
          )}
          id= {isLast ? 'last' : ''}
      >
        <h5 className="text-[8px] italic mb-[3px]">{renderFrom()}</h5>

        <div className={cn("flex justify-between w-full items-end", !facing && 'flex-row-reverse', image && 'flex-col')}>
          {renderMessage()}

          <div className={cn('ml-2 flex', !facing && 'mr-2 ml-0', image && 'mr-0 ml-0', _id === '1' && 'mt')}>

            {isSent && image && (
              <ViewMotionWrapper className="text-[7px] mt-1 mr-2" duration={1} y = {0}>
                {moment(createdAt).calendar()}
              </ViewMotionWrapper>
            )}

            <div className= {cn(image && 'mt-1')}>
              <MessageStatus isLast = {isLast} isSent = {isSent!} hasError = {hasError!} />
            </div>
          </div>
        </div>
      </div>

      {isSent && !image && (
        <ViewMotionWrapper className="text-[7px]" duration={1} y = {0}>
          {moment(createdAt).calendar()}
        </ViewMotionWrapper>
      )}
    </ViewMotionWrapper>
  );
};

export default MessageTile;
