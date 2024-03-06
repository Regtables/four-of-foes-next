import React, { FormEvent, useState } from "react";
import AccordionLayout from "../layout/AccordionLayout";
import FeedbackSlider from "../feedback/FeedbackSlider";
import ButtonPill from "@/components/buttons/ButtonPill";
import axios from "axios";
import { usePortalProgress } from "@/context/PortalProgressContext";
import { useModal } from "@/hooks/useModal";

const FeedbackAccordion = ({
  data,
}: {
  data: { rating: number; review: string };
}) => {
  const [currentRating, setCurrentRating] = useState(
    data.rating ? data.rating : 50
  );
  const { handleOpen, handleClose } = useModal()
  const [feedback, setFeedback] = useState(data.review ? data.review : "");

  const { progress } = usePortalProgress();
  const { isReviewSubmitted } = progress;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      handleOpen('loading')
      const res = await axios.post("/api/portal/feedback", {
        currentRating,
        feedback,
      });
    } catch (error) {
      console.log(error);
    } finally {
      handleClose('loading')
    }
  };

  return (
    <AccordionLayout title="feedback" section={3} list>
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

        <textarea
          className="bg-transparent outline-none border-[1px] border-white w-full lg:w-[50vw] rounded-md p-2 tracking-[0.2em] font-[var(--font-family)] font-meduim italic text-[10px]"
          rows={10}
          value={feedback}
          placeholder="Message..."
          onChange={(e) => setFeedback(e.target.value)}
        ></textarea>

        <div className="w-[150px] mx-auto">
          <ButtonPill fill text={isReviewSubmitted ? 'update feedback' : 'submit'} type="submit" />
        </div>
      </form>
    </AccordionLayout>
  );
};

export default FeedbackAccordion;
