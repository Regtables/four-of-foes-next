import React from 'react'
import ButtonLrg from '../../buttons/ButtonLrg'

const PortalAuth = () => {
  return (
    <div className='flex flex-col items-center justify-center h-full gap-4'>
      <div className='text-[var(--color-gold)] uppercase tracking-[0.2em] text-2xl font-semibold heading-font'>
        Welcome, Patron
      </div>
      <div className='w-[60%] text-center text-[10px] mb-4'>
        Hi, Reghardt.
        Welcome to the Four of Foes Patron Lounge. Please click enter if you agree to our terms.
      </div>

      <ButtonLrg text='Enter Lounge' />
    </div>
  )
}

export default PortalAuth