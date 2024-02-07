import { useBookingForm } from "@/context/BookingFormContext";

import Upload from "./Upload";

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
      <Upload selectedFile={selectedFile1} setSelectedFile={setSelectedFile1} />

      <Upload selectedFile={selectedFile2} setSelectedFile={setSelectedFile2} />

      <Upload selectedFile={selectedFile3} setSelectedFile={setSelectedFile3} />

      <Upload selectedFile={selectedFile4} setSelectedFile={setSelectedFile4} />
    </div>
  );
};

export default References;
