'use client'

import { PortalProgressType } from "@/types";
import { createContext, useContext, useState } from "react";

const defaultState = {
  progress: {
    isDepositConfirmed: false,
    isPaymentConfirmed: false,
    isReviewSubmitted: false,
    isTattooCompleted: false,
    isIndemnitySigned: false,
    isAppliedForResheudle: false,
    resheduleDate: '',
    isAppliedForCancelation: false
  },
  setProgress: (progress: PortalProgressType) => {},
  handleSetProgressSection: (section: string, value: string | boolean) => {},
  clearProgress: () => {}
}

interface PortalProgressProviderProps {
  children: React.ReactNode
}

const PortalProgressContext = createContext(defaultState)

export const PortalProgressProvider: React.FC<PortalProgressProviderProps> = ({ children }) => {
  const [progress, setProgress] = useState<PortalProgressType>(defaultState.progress)

  console.log(progress)
  const handleSetProgressSection = (section: string, value: boolean | string) => {
    console.log(section)
    setProgress({ ...progress, [section]: value })
    console.log(progress)
  }

  const clearProgress = () => {
    setProgress(defaultState.progress)
  }

  return (
    <PortalProgressContext.Provider value={{progress, setProgress, handleSetProgressSection, clearProgress}}>
      {children}
    </PortalProgressContext.Provider>
  )
}

export const usePortalProgress = () => {
  const context = useContext(PortalProgressContext)

  if(!context) throw new Error('usePortalSettings must be used within the PortalProgressProvider')

  return context
}

 