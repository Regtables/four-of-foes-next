//the most ambitious component I will have written
'use client'

import React from 'react'
import Partition from './PortalLinkList/Partition'
import { useAppSettings } from '@/context/AppSettingsContext'
import { cn } from '@/app/lib/utils'

const PortalSectionAccordion = ({ Section1, Section2, Section3 } : { Section1: React.FC, Section2: React.FC, Section3: React.FC }) => {
  const sectionStyles = ''
  const partitionStyles = 'max-w-[200px] mx-auto min-h-[1px] h-[1px] w-[200px] relative z-10 flex items-center transition-all duration-1000'

  const { toggleAccordion, setToggleAccordion } = useAppSettings()

  const renderPartitionClass = (section: number, section2?: number) => {
    if(toggleAccordion === 1 && section !== 1){
      return 'opacity-20'
    } else if (toggleAccordion === 2 && (section !== 2 && section2 !== 2)){
      return 'opacity-20'
    } else if(toggleAccordion === 3 && (section !== 3 && section2 !== 3)){
      return 'opacity-20'
    }
  }

  console.log(toggleAccordion)

  return (
    <div className='w-full absolute left-0 bottom-10 flex flex-col justify-center transition-all duration-500'>
      {/* first component */}
      <div className= {cn(partitionStyles, renderPartitionClass(1))}>
        <Partition />
      </div>

      <div className={sectionStyles} >
        {Section1}
      </div>

      <div className= {cn(partitionStyles, renderPartitionClass(1, 2))}>
        <Partition />
      </div>

      <div>
        {Section2}
      </div>

      <div className= {cn(partitionStyles, renderPartitionClass(2, 3))}>
        <Partition />
      </div>

      <div>
        {Section3}
      </div>

      <div className= {cn(partitionStyles, renderPartitionClass(3))}>
        <Partition />
      </div>
    </div>
  )
}

export default PortalSectionAccordion