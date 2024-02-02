import React from 'react'
import { Asterisk } from 'lucide-react'

interface BookingSectionLayoutProps {
  children: React.ReactNode,
  heading: {
    heading: string,
    description?: string
  },
  section: string
}

const BookingSectionLayout = ({ children, heading, section } : BookingSectionLayoutProps) => {
  const { heading: title, description } = heading

  return (
    <div className='w-full mb-16'>
      <header className='flex flex-col items-center'>
        <h2 className='booking_title'>{title}</h2>

        <Asterisk size={14} className='mt-2'/>

        {description && (
          <p className='text-center text-[10px] tracking-[0.15em] italic mt-2'>{description}</p>
        )}
      </header>

      <div className='mt-4'>
        {children}
      </div>
    </div>
  )
}

export default BookingSectionLayout