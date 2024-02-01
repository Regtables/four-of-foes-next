import Hero from "@/components/sections/Hero"
import { fetchBookingFormContent } from "../lib/actions/content/fetchContent"

export default async function Home() {
  const bookingFormData = await fetchBookingFormContent()

  return (
    <main className="">
      <Hero bookingFormData={bookingFormData}/>
    </main>
  )
}
