import { useBookingForm } from "@/context/BookingFormContext";

import Upload from "./Upload";
import ViewMotionWrapper from "../layout/Motion/ViewMotionWrapper";

const References = () => {
  const {
    selectedFile1,
    selectedFile2,
    selectedFile3,
    selectedFile4,
    setSelectedFile1,
    setSelectedFile2,
    setSelectedFile3,
    setSelectedFile4,
  } = useBookingForm();

  return (
    <div className="grid grid-cols-2 lg:gap-4 gap-3">
      <ViewMotionWrapper y = {0} x = {-10} duration={1}>
        <Upload selectedFile={selectedFile1} setSelectedFile={setSelectedFile1} />
      </ViewMotionWrapper>

      <ViewMotionWrapper y = {0} x = {10} duration={1}>
        <Upload selectedFile={selectedFile2} setSelectedFile={setSelectedFile2} />
      </ViewMotionWrapper>

      <ViewMotionWrapper y = {0} x = {-10} duration={1} delay={0.2}>
        <Upload selectedFile={selectedFile3} setSelectedFile={setSelectedFile3} />
      </ViewMotionWrapper>
      
      <ViewMotionWrapper y = {0} x = {10} duration={1} delay={0.2}>
        <Upload selectedFile={selectedFile4} setSelectedFile={setSelectedFile4} />
      </ViewMotionWrapper>
    </div>
  );
};

export default References;
