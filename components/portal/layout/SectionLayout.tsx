'use client'

import { useSection } from '@/context/PortalSectionContext'
import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

const SectionLayout = ({ children, section } : { children: React.ReactNode, section: string }) => {
  const { handleSectionChange, currentSection } = useSection()

  const { inView: beginInView, ref: beginRef } = useInView()
  const { inView: endInView, ref: endRef } = useInView()

  useEffect(() => {
    if(beginInView){
      handleSectionChange(section, true)
    }
  } , [beginInView, endInView])

  return (
    <div className='h-full flex flex-col items-center w-full relative' id = {section}>
      <div className='absolute start-[25%]' ref = {beginRef} />
      {children}
      <div className='absolute end-[25%]' ref = {endRef} />
    </div>
  )
}

export default SectionLayout