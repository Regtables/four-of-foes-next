import Contact from '@/components/booking/Contact'
import PageHeading from '@/components/headings/PageHeading'
import React from 'react'

const ContactPage = () => {
  return (
    <div className='w-screen overflow-hidden h-[90vh] flex flex-col items-center justify-center mt-9'>
      {/* <h2 className='booking_title text-center mb-14 flex flex-col items-center justify-center'>Contact</h2> */}
      <PageHeading />
      <Contact page />
    </div>
  )
}

export default ContactPage