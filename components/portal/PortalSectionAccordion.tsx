//the most ambitious component I will have written
'use client'

import React from 'react'
import Partition from './PortalLinkList/Partition'

const PortalSectionAccordion = ({ Section1, Section2, Section3 }) => {
  const sectionStyles = ''
  const partitionStyles = 'max-w-[200px] mx-auto min-h-[1px] h-[1px] w-[200px] relative z-10 flex items-center'
  return (
    <div className='w-full absolute left-0 bottom-10 flex flex-col justify-center transition-all duration-500'>
      {/* first component */}
      <div className= {partitionStyles}>
        <Partition />
      </div>

      <div className={sectionStyles}>
        {Section1}
      </div>

      <div className= {partitionStyles}>
        <Partition />
      </div>

      <div>
        {Section2}
      </div>

      <div className= {partitionStyles}>
        <Partition />
      </div>

      <div>
        {Section3}
      </div>

      <div className= {partitionStyles}>
        <Partition />
      </div>
    </div>
  )
}

export default PortalSectionAccordion