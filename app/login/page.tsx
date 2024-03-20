import React from 'react'
import { SignIn } from '@clerk/nextjs'

const page = () => {
  return (
    <div className='h-screen flex justify-center items-center'>
      <SignIn afterSignUpUrl={'/portal/messenger-dashboard/'} afterSignInUrl={'/portal/messenger-dashboard/'} />
    </div>
  )
}

export default page