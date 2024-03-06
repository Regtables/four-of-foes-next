"use client";

import React, { useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import { usePortalProgress } from "@/context/PortalProgressContext";
import { useModal } from "@/context/ModalContext";

import DrawerLayout from "../layout/DrawerLayout";
import Calendar from "@/components/booking/Calendar";
import ButtonPill from "@/components/buttons/ButtonPill";
import Partition from "../PortalLinkList/Partition";

const AppointmentActionsDrawer = () => {
  const [resheudleDate, setResheudleDate] = useState("");
  const { handleSetProgressSection, progress } = usePortalProgress();
  const router = useRouter()

  const {
    isAppliedForResheudle,
    resheduleDate: newDate,
    isAppliedForCancelation,
  } = progress;
  const { handleModalOpen, handleModalClose } = useModal();

  const handleResheudleClick = () => {
    handleModalOpen("alert", {
      alert: {
        title: "Resheudle Appointment",
        content: `You are about to request to resheudle your appointment to the ${resheudleDate}. Do you wish to proceed?`,
        confirm: "Proceed",
        handleConfirm: async () => {
          await handleResheudle();

          handleModalClose("alert");
        },
      },
    });
  };

  const handleCancelationClick = () => {
    handleModalOpen("alert", {
      alert: {
        title: "Appointment Cancelation",
        content:
          "You are about to permanently cancel your appointment. No refunds on deposits will be given. Are you sure you wish to proceed?",
        confirm: "proceed",
        handleConfirm: async () => {
          await handleCancelation();

          handleModalClose("alert");
        },
      },
    });
  };

  const handleResheudle = async () => {
    try {
      handleModalOpen('loading')
      console.log(progress);
      const res = await axios.post(
        "/api/portal/resheudule-appointment",
        { date: resheudleDate },
        { withCredentials: true }
      );

      // if (res.status === 200) {
        handleSetProgressSection("isAppliedForResheudle", true);
        handleSetProgressSection("resheduleDate", resheudleDate);
      // }
    } catch (error) {
      console.log(error);
    } finally {
      handleModalClose('loading')
    }
  };

  const handleCancelation = async () => {
    try {
      handleModalOpen("loading");
      const res = await axios.post(
        "/api/portal/cancel-appointment",
        {},
        { withCredentials: true }
      );

      if (res.status === 200) {
        handleSetProgressSection("isAppliedForCancelation", true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      handleModalClose("loading");
    }
  };

  return (
    <DrawerLayout title={"cancel/resheudule"}>
      <div className="flex flex-col gap-6 items-center w-[80vw]">
        <div className="flex flex-col gap-2 w-full">
          <h3 className="title text-center mb-4">Resheudle Appointment</h3>

          {isAppliedForResheudle ? (
            <p className="paragraph text-center">
              You have applied to resheudle your appointment to {newDate}
            </p>
          ) : (
            <>
              <Calendar
                confirmedDate={resheudleDate}
                setConfirmedDate={setResheudleDate}
              />

              <div
                className="w-[60vw] h-[28px] mx-auto mt-4"
                onClick={handleResheudleClick}
              >
                <ButtonPill
                  text="request new date"
                  fill={resheudleDate ? true : false}
                  disabled={!resheudleDate ? true : false}
                />
              </div>
            </>
          )}
        </div>

        <div className="w-20">
          <Partition />
        </div>

        <div className="flex flex-col gap-4 w-full">
          <h3 className="title text-center">Cancel Appointment</h3>

          {isAppliedForCancelation ? (
            <p className="text-center paragraph">
              You have applied to cancel your appointment
            </p>
          ) : (
            <div
              className="w-[60vw] mx-auto h-[28px]"
              onClick={handleCancelationClick}
            >
              <ButtonPill text="request cancelation" fill />
            </div>
          )}
        </div>
      </div>
    </DrawerLayout>
  );
};

export default AppointmentActionsDrawer;
