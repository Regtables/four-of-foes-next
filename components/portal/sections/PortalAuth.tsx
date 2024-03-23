"use client";

import React, { Fragment, useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { Asterisk } from "lucide-react";

import { ClientType } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import { useModal } from "@/context/ModalContext";

import ButtonLrg from "../../buttons/ButtonLrg";
import ViewMotionWrapper from "@/components/layout/Motion/ViewMotionWrapper";
import PortalVerification from "./PortalVerification";

const PortalAuth = ({
  client,
  isVerified,
}: {
  client: ClientType;
  isVerified: any;
}) => {
  const { signInClient, createAndSendVerificationCode, verifyCode } = useAuth();
  const { handleModalOpen, handleModalClose } = useModal();
  const [isClientVerification, setIsClientVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const router = useRouter();

  // if (!client) redirect("/");

  useEffect(() => {
    if (!client) {
      handleModalOpen("alert", {
        alert: {
          title: "Could not find client profile",
          content:
            "We could not find your profile on our system, please confirm your sign in link.",
          confirm: "Okay",
          handleConfirm: () => {
            handleModalClose("alert");
            router.push("/");
          },
        },
      });
    }
  }, [client]);

  useEffect(() => {
    if (verificationCode.length === 6) {
      // handleRegistrationVerification(verificationCode);
      verifyCode(client, verificationCode.toString().toUpperCase())
    }
  }, [verificationCode]);

  const handleButtonClick = async () => {
    try {
      handleModalOpen('loading')
      if (isVerified) {
        await signInClient(client);
      } else {
        createAndSendVerificationCode(client._id)
        setIsClientVerification(true);
      }
    } catch (error) {
      console.log(error);

      throw error
    } finally{
      handleModalClose('loading')
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 border-2 border-[var(--color-gold)] rounded-[20px] h-[50%] w-[85%] lg:h-[60%] lg:w-[40%]">
      {/* {client ? ( */}
      <div className="text-[var(--color-gold)] uppercase tracking-[0.2em] text-2xl font-semibold heading-font">
        Welcome, Patron
      </div>
      <Asterisk size={10} />

      {!isClientVerification ? (
        <Fragment>
          <div className="w-[60%] text-center text-[12px] mb-4 tracking-[0.05em]">
            Hi, Reghardt. Welcome to the Four of Foes booking Lounge. Kindly
            review our <span className="underline">terms and conditions</span>,
            and then proceed.
          </div>

          <div onClick={handleButtonClick}>
            <ButtonLrg text="Enter Lounge" />
          </div>
        </Fragment>
      ) : (
        <ViewMotionWrapper duration={1}>
          <PortalVerification
            code={verificationCode}
            handleChange={setVerificationCode}
          />
        </ViewMotionWrapper>
      )}
      {/* ) : (
        <Fragment></Fragment>
      )} */}
    </div>
  );
};

export default PortalAuth;
