import Contact from '@/components/booking/Contact'
import PageHeading from '@/components/headings/PageHeading'
import React from 'react'

const ContactPage = () => {
  return (
    <div className='w-screen h-[100vh] flex flex-col items-center justify-center mt-8 overflow-hidden'>
      {/* <h2 className='booking_title text-center mb-14 flex flex-col items-center justify-center'>Contact</h2> */}
      <PageHeading />
      <Contact page />
    </div>
  )
}

export default ContactPage