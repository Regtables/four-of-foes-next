import Contact from '@/components/booking/Contact'
import PageHeading from '@/components/headings/PageHeading'
import React from 'react'

const ContactPage = () => {
  return (
    <div className='w-screen h-[100vh] lg:max-h-screen flex flex-col items-center justify-center overflow-hidden'>
      {/* <h2 className='booking_title text-center mb-14 flex flex-col items-center justify-center'>Contact</h2> */}
      <div className='mt-8'>
        <PageHeading />
      </div>
      <Contact page />
    </div>
  )
}

export default ContactPage