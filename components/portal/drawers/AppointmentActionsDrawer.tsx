"use client";

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

import { usePortalProgress } from "@/context/PortalProgressContext";
import { useModal } from "@/context/ModalContext";

import DrawerLayout from "../layout/DrawerLayout";
import Calendar from "@/components/booking/Calendar";
import ButtonPill from "@/components/buttons/ButtonPill";
import Partition from "../PortalLinkList/Partition";

const AppointmentActionsDrawer = () => {
  const { handleSetProgressSection, progress } = usePortalProgress();
  const {
    isAppliedForResheudle,
    resheduleDate: newDate,
    isAppliedForCancelation,
  } = progress;

  console.log(progress)
  const [resheudleDate, setResheudleDate] = useState("");
  const [isResheudle, setIsResheudle] = useState(isAppliedForResheudle)
  const [isCancelation, setIsCancelation] = useState(isAppliedForCancelation)
  const [toggleChildAccordion, setToggleChildAccordion] = useState(false)

  const { handleModalOpen, handleModalClose , handleActionErrorAlertOpen} = useModal();

  useEffect(() => {
    setIsResheudle(isAppliedForResheudle);
    setIsCancelation(isAppliedForCancelation);
  }, [isAppliedForResheudle, isAppliedForCancelation]);

  // const isResheudle = useMemo(() => {
  //   return isAppliedForResheudle ? true : false
  // }, [isAppliedForResheudle])

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
        option: 'No',
        handleOption: () => handleModalClose('alert')
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

      if (res.status === 200) {
        handleSetProgressSection("isAppliedForResheudle", true);
        handleSetProgressSection("resheduleDate", resheudleDate);

        setIsResheudle(true)
      }
    } catch (error) {
      console.log(error);

      handleActionErrorAlertOpen('requesting a new date for your appointment')
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
        setIsCancelation(true)
        handleSetProgressSection("isAppliedForCancelation", true);
      }
    } catch (error) {
      console.log(error);

      handleActionErrorAlertOpen('requesting to cancel your appointment')
    } finally {
      handleModalClose("loading");
    }
  };

  return (
    <DrawerLayout title={"cancel/resheudule"} toggleChildAccordion = {toggleChildAccordion}>
      <div className="flex flex-col gap-6 items-center w-[80vw] lg:w-[30vw]">
        <div className="flex flex-col gap-2 w-full">
          <h3 className="title text-center mb-4">Resheudle Appointment</h3>

          {isResheudle ? (
            <p className="paragraph text-center">
              You have applied to resheudle your appointment to {newDate}
            </p>
          ) : (
            <>
              <Calendar
                confirmedDate={resheudleDate}
                setConfirmedDate={setResheudleDate}
                setToggleChildAccordion={setToggleChildAccordion}
              />

              <div
                className="w-[60vw] lg:w-[30vw] h-[28px] mx-auto mt-4"
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

          {isCancelation ? (
            <p className="text-center paragraph">
              You have applied to cancel your appointment
            </p>
          ) : (
            <div
              className="w-[60vw] lg:w-[30vw] mx-auto h-[28px]"
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
