"use client";

import React from "react";
import Image from "next/image";
import { Asterisk } from "lucide-react";

// import { useModal } from '@/hooks/useModal'
import { useModal } from "@/context/ModalContext";

import Popup from "../layout/Popup";
import ButtonPill from "../buttons/ButtonPill";

const AlertModal = () => {
  const { isOpen, types, data } = useModal();

  if (!data?.alert) return null;

  const isModalOpen = isOpen && types?.includes("alert");

  const { alert } = data;
  const { title, content, confirm, handleConfirm, option, handleOption } =
    alert;

  return (
    <Popup isOpen = {isModalOpen!} fade>
      <div className='border-4 border-[var(--color-gold)] w-[80%] flex flex-col items-center text-center gap-8 py-8 px-10 rounded-2xl my-auto'>
        <h2 className='text-[var(--color-gold)] uppercase tracking-[0.2em] text-2xl font-[400] heading-font'>{title}</h2>
        <Asterisk size = {15} />

        <p className='text-center text-[10px] tracking-[0.15em]'>{content}</p>

        <div
          className="min-w-[120px] max-w-[250px] w-full min-h-[40px]"
          onClick={() => handleConfirm()}
        >
          <ButtonPill text={confirm} />
        </div>

        {option && (
          <div
            className="min-w-[120px] max-w-[250px] w-full min-h-[40px]"
            onClick={() => handleOption()}
          >
            <ButtonPill text={option} />
          </div>
        )}

        {/* {signature && (
          <div className='relative h-[90px] w-[150px]'>
            <Image 
              src = '/signature.png'
              fill
              alt = "Ted Faulmann's Signature"
              className='object-cover'
              priority
            />
          </div>
        )} */}
      </div>
    </Popup>
  );
};

export default AlertModal;
