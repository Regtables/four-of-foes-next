'use client'

import React, { createContext, useContext, useState } from 'react'

const PortalSectionContext = createContext({ currentSection: 'lounge', handleSectionChange: (section: string, enter: boolean) => {}})

export const PortalSectionProvider = ({ children } : { children: React.ReactNode }) => {
  const [currentSection, setCurrentSection] = useState('lounge')

  const handleSectionChange = (section: string, enter: boolean) => {
    setCurrentSection(section)
  }
  
  return (
    <PortalSectionContext.Provider value={{currentSection, handleSectionChange}}>
      {children}
    </PortalSectionContext.Provider> 
  )
}

export const useSection = () => {
  return useContext(PortalSectionContext)
}
