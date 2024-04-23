import React, { FormEvent, useState } from "react";
import axios from "axios";

import { usePortalProgress } from "@/context/PortalProgressContext";
import { useModal } from "@/context/ModalContext";
import { PortalFeedbackProps } from "../accordions/FeedbackAccordion";

import FeedbackSlider from "../feedback/FeedbackSlider";
import ButtonPill from "@/components/buttons/ButtonPill";

const PortalFeedback: React.FC<PortalFeedbackProps> = ({ data }) => {
  const [currentRating, setCurrentRating] = useState(
    data?.rating ? data?.rating : 50
  );
  const { handleModalOpen, handleModalClose, handleActionErrorAlertOpen } =
    useModal();
  const [feedback, setFeedback] = useState(data?.review ? data?.review : "");

  const { progress, handleSetProgressSection } = usePortalProgress();
  const { isReviewSubmitted } = progress;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      handleModalOpen("loading");
      const res = await axios.post("/api/portal/feedback", {
        currentRating,
        feedback,
      });

      if (res.status === 200) {
        handleSetProgressSection("isReviewSubmitted", true);
      }
    } catch (error) {
      console.log(error);

      handleActionErrorAlertOpen("submit/update your feedback");
    } finally {
      handleModalClose("loading");
    }
  };
  return (
    <div>
      <form
        className="flex flex-col items-center gap-8"
        onSubmit={handleSubmit}
      >
        <div className="mb-4 text-[9px] text-center tracking-[--letter-spacing-sm] pt-3">
          How do you rate your experience?
        </div>

        <div className="">
          <FeedbackSlider
            currentRating={currentRating}
            setCurrentRating={setCurrentRating}
            disabled={isReviewSubmitted}
          />
        </div>

        <div className="border-[1px] border-white w-full lg:w-[50vw] rounded-md p-2 pb-4">
          <textarea
            className="bg-transparent outline-none w-full rounded-md p-2 tracking-[0.2em] font-[var(--font-family)] font-meduim italic text-[10px]"
            rows={10}
            value={feedback}
            placeholder="Message..."
            onChange={(e) => setFeedback(e.target.value)}
          ></textarea>

          <div className="w-[160px] h-[20px] mx-auto">
            <ButtonPill
              text={isReviewSubmitted ? "update feedback" : "submit feedback"}
              type="submit"
            />
          </div>
        </div>
      </form>

    <a href="https://www.google.com/maps/place//data=!4m3!3m2!1s0x631c5ce16abf4f63:0xc1c899d738368501!12e1?source=g.page.m.dd._&laa=lu-desktop-reviews-dialog-review-solicitation" target = '_blank' rel = 'noreferrer'>
      <div className="w-[190px] h-[23px] mx-auto mt-8">
        <ButtonPill
          fill
          text={'Submit google review'}
          type="button"
        />
      </div>
    </a>
    </div>
  );
};

export default PortalFeedback;
