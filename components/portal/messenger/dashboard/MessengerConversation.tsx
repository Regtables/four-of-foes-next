'use client'

import React from "react";
import Link from "next/link";
import { Calendar, ChevronLeft, MapPin } from "lucide-react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

import { ClientType } from "@/types";
import { archiveClient, deleteClient } from "@/app/lib/actions/messages/messagesApi";
import { useModal } from "@/context/ModalContext";

import ViewMotionWrapper from "@/components/layout/Motion/ViewMotionWrapper";
import MessageInput from "../MessageInput";
import Messages from "../Messages";
import ButtonPill from "@/components/buttons/ButtonPill";

const MessengerConversation = ({ client }: { client: ClientType }) => {
  const { handleModalOpen, handleModalClose } = useModal()
  const router = useRouter()
  // useEffect(() => {
  //   const deleteMessages = async () => {
  //     await axios.delete('/api/portal/messenger/delete-messages')
  //   }

  //   deleteMessages()
  // }, [])

  const handleArchiveClick = async () => {
    try{
      handleModalOpen('loading')
      const res = await archiveClient(client)
      router.push('/portal/messenger-dashboard')
      router.refresh()
    } catch (error) {
      console.log(error)
    } finally {
      handleModalClose('loading')
    }
  }

  const handleDeleteConfirmClick = async () => {
    try {
      await deleteClient(client)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ViewMotionWrapper y={0} duration={0.3} className="flex flex-col">
      <Link
        href={"/portal/messenger-dashboard"}
        className="flex gap-2 uppercase text-[10px] mt-2 items-center md:hidden"
      >
        <ChevronLeft />

        <div className="mt-[1px] tracking-[0.15em]">back to conversations</div>
      </Link>

      {/* <Suspense> */}
      <div className="border-b-[1px] border-white p-2 flex lg:flex-row flex-col lg:items-center justify-between flex-[0.1]">
        <div>
          <div className="uppercase text-[16px] font-semibold tracking-wider mb-1">
            {client?.clientName}
          </div>

          <div className="flex text-[9px] items-center gap-1 mb-[2px] font-light tracking-wide">
            <MapPin size={12} />
            {client?.appointmentDetails?.appointmentLocation},{" "}
            {client?.appointmentDetails?.appointmentCity}
          </div>

          <div className="flex text-[9px] items-center gap-1 font-light tracking-wide">
            <Calendar size={12} />
            {format(
              new Date(client?.appointmentDetails?.appointmentDate),
              "dd MMMM yyyy"
            )}
          </div>
        </div>

        <div>
        <div className="h-[30px] w-[300px] flex gap-4 md:mt-0 mt-2">
          <ButtonPill text="Archive client" fill handleClick={handleArchiveClick}  />  

          <ButtonPill text = 'Delete Client' fill handleClick={handleDeleteConfirmClick} className="bg-red-800 border-none"/>
        </div>
        </div>
      </div>
      {/* </Suspense> */}

      {/* Use fallback */}
      {/* <Suspense> */}
        <div className="flex-[0.85] px-0 max-h-[76vh] lg:min-h-[78vh] min-h-[73vh] overflow-auto">
          <Messages />
        </div>
      {/* </Suspense> */}

      {/* <Suspense> */}
        <div className="flex-[0.05] p-2 pb-4">
          <MessageInput />
        </div>
      {/* </Suspense> */}
    </ViewMotionWrapper>
  );
};

export default MessengerConversation;
