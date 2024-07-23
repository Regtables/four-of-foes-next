//the most ambitious component I will have written
'use client'

import React from 'react'
import Partition from './PortalLinkList/Partition'
import { useAppSettings } from '@/context/AppSettingsContext'
import { cn } from '@/app/lib/utils'

interface PortalSectionAccordionProps {
  Section1: React.ReactNode,
  Section2: React.ReactNode,
  Section3: React.ReactNode,
}

const PortalSectionAccordion: React.FC<PortalSectionAccordionProps> = ({ Section1, Section2, Section3 }) => {
  const sectionStyles = 'overflow-auto'
  const partitionStyles = 'max-w-[200px] mx-auto min-h-[1px] h-[1px] w-[200px] relative z-10 flex items-center transition-all duration-1000'

  const { toggleAccordion, setToggleAccordion } = useAppSettings()

  const renderPartitionClass = (section: number, section2?: number) => {
    if(toggleAccordion === 1 && section !== 1){
      return 'opacity-10'
    } else if (toggleAccordion === 2 && (section !== 2 && section2 !== 2)){
      return 'opacity-10'
    } else if(toggleAccordion === 3 && (section !== 3 && section2 !== 3)){
      return 'opacity-10'
    }
  }

  return (
    <div className={`flex flex-col items-center justify-center transition-all duration-500`}>
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