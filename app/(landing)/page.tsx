import Hero from "@/components/sections/Hero";
import { fetchBookingFormContent } from "../lib/actions/content/fetchContent";
import { BookingFormProvider } from "@/context/BookingFormContext";
import { Suspense } from "react";

export default async function Home() {
  const bookingFormData = await fetchBookingFormContent();

  return (
    <div className="max-h-100vh overflow-hidden">
      <Suspense>
        <Hero bookingFormData={bookingFormData} />
      </Suspense>
    </div>
  );
}
