import React from 'react'

const SectionLayout = ({ children } : { children: React.ReactNode }) => {
  return (
    <div className='h-full flex flex-col items-center w-full overflow-hidden'>
      {children}
    </div>
  )
}

export default SectionLayout