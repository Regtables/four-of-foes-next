import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

import { ClientIndemnityType, IndemnityType, MiniIndemnityClauseType } from "@/types";
import { useModal } from "./ModalContext";
import { usePortalProgress } from "./PortalProgressContext";
import { signIndemnity, revokeIndemnity } from '@/app/lib/actions/indemnity/indemnityApi'

interface IndemnityContextProps {
  indemnityClauses: IndemnityType[],
  miniIndemnityClauses: MiniIndemnityClauseType[],
  consentedClauses: IndemnityType[]
  consentedMiniClauses: MiniIndemnityClauseType[],
  isIndemnitySignReady: boolean,
  indemnityDescription: string,
  clientIndemnity: ClientIndemnityType,
  isIndemnitySigned: boolean,
  dateCaptured: Date | string,
  handleClauseCheck: (id: string) => void
  handleMiniClauseCheck: (clause: MiniIndemnityClauseType) => void,
  handleSignConfirm: () => void,
  handleSubmit: () => void,
  handleRevokeClick: () => void,
  handleIndemnityRevoke: () => void,
  resetPage: () => void
}

interface IndemnityProviderProps {
  indemnityClauses: IndemnityType[],
  miniIndemnityClauses: MiniIndemnityClauseType[],
  clientIndemnity: ClientIndemnityType,
  children?: React.ReactNode,
}

const IndemnityContext = createContext<IndemnityContextProps | undefined>(undefined)

export const IndemnityProvider:React.FC<IndemnityProviderProps>= ({ children, indemnityClauses: clauses, miniIndemnityClauses: miniClauses, clientIndemnity }) => {
  const [indemnityClauses, setIndemnityClauses] = useState<IndemnityType[]>(clauses);
  const [miniIndemnityClauses, setMiniIndemnityClauses] = useState<MiniIndemnityClauseType[]>(miniClauses);
  const [consentedClauses, setConsentedClauses] = useState<IndemnityType[]>([]);
  const [consentedMiniClauses, setConsentedMiniClauses] = useState<MiniIndemnityClauseType[]>([]);
  const [dateCaptured, setDateCapetured] = useState<Date | string>('')

  const { handleModalOpen, handleModalClose, handleActionErrorAlertOpen } = useModal()
  const { handleSetProgressSection, progress } = usePortalProgress()
  const { isIndemnitySigned } = progress

  const isIndemnitySignReady = useMemo(() => {
    return consentedClauses.length === indemnityClauses.length
  }, [consentedClauses, indemnityClauses])

  const indemnityDescription = useMemo(() => {
    return isIndemnitySigned
      ? "If you would like to update your indemnity consent, please revoke your consent first, and then submit the form again"
      : "Please read through our indemnity clauses, after which you can provide consent by agreeing and submitting the form";
  }, [progress.isIndemnitySigned])

  useEffect(() => {
    if(clientIndemnity.captureDate !== ''){
      setIndemnityClauses(clientIndemnity.agreedMainClauses)
      setMiniIndemnityClauses(clientIndemnity.agreedIndividualClauses)
      setDateCapetured(clientIndemnity.captureDate)
    }
  }, [clientIndemnity])

  const handleSubmit = () => {
    if(consentedMiniClauses.length == 0){
      handleModalOpen('alert', { alert: {
        title: "Omission of Consent",
        content: "You have not agreed to any individual clauses, please review your consent and agree to the clauses that apply",
        confirm: "okay",
        handleConfirm: () => handleModalClose('alert'),
      }})
    } else {
      handleModalOpen('alert', { alert: {
        title: "Caution",
        content: "You are about to give full permission to forgo your indemity in the case of damanges. Please ensure you understand and click agree if you consent to the terms and conditions",
        confirm: "Agree",
        handleConfirm: () => handleSignConfirm(),
        option: 'Disagree',
        handleOption: () => handleModalClose('alert'),
      }})
    }
  }

  const handleSignConfirm = async () => {
    try{
      handleModalOpen('loading')
      const res = await signIndemnity(indemnityClauses, miniIndemnityClauses)

      if(res.status === 200){
        handleSetProgressSection('isIndemnitySigned', true)
        setDateCapetured(new Date())
      } else {
        throw new Error('Error signing indemnity')
      }
    } catch (error){
      console.log(error)
      handleModalClose('alert')
  

      setTimeout(() => {
        handleActionErrorAlertOpen('capturing your indemnity consent')
      }, 700);
    } finally{
      handleModalClose('loading')
    }
  }

  const handleRevokeClick = () => {
    handleModalOpen('alert', { alert: {
      title: 'Caution',
      content: 'This will revoke the whole of your indemnity concent, and you would have to submit the form again with your updated content in order to be eligible for your appointment again.',
      confirm: 'proceed',
      handleConfirm: handleIndemnityRevoke,
      option: 'cancel',
      handleOption: () => handleModalClose('alert')
    }})
  }

  const handleIndemnityRevoke = async () => {
    try{
      handleModalOpen('loading')
      const res = await revokeIndemnity()

      if(res.status === 200){
        handleSetProgressSection('isIndemnitySigned', false)
        resetPage()
      }
    } catch (error){
      console.log(error)

      setTimeout(() => {
        handleActionErrorAlertOpen('revoking your indemnity consent')
      }, 700);

      throw error
    } finally {
      handleModalClose('loading')
    }
  }

  const handleClauseCheck = (id: string) => {
    if(!isIndemnitySigned){
      setIndemnityClauses((prev) => {
        return prev.map((clause) => {
          if (clause.id === id) {
            if (!clause.consentGiven) {
              setConsentedClauses((prev) => [...consentedClauses, clause]);
            } else {
              const newConsentedClauses = consentedClauses.filter(
                (clause) => clause.id !== id
              );
              setConsentedClauses(newConsentedClauses);
            }
  
            return {
              ...clause,
              consentGiven: !clause.consentGiven,
              dateCaptured: new Date(),
            };
          } else {
            return clause;
          }
        });
      });
    }
  };

  const handleMiniClauseCheck = (agreedClause: any) => {
    if(!isIndemnitySigned){
      setMiniIndemnityClauses((prev) => {
        return prev.map((clause) => {
          if (clause.clause === agreedClause.clause) {
            if (
              !consentedMiniClauses.find(
                (clause) => clause.clause === agreedClause.clause
              )
            ) {
              setConsentedMiniClauses(() => [
                ...consentedMiniClauses,
                agreedClause,
              ]);
            } else {
              const newMiniClauses: MiniIndemnityClauseType[] =
                consentedMiniClauses.filter(
                  (clause) => clause.clause !== agreedClause.clause
                );
              setConsentedMiniClauses(newMiniClauses);
            }
  
            return {
              ...clause,
              consentGiven: !clause.consentGiven,
              dateCaptured: new Date(),
            };
          } else {
            return clause;
          }
        });
      });
    }
  };

  const resetPage = () => {
    setIndemnityClauses(clauses);
    setMiniIndemnityClauses(miniClauses);
    setConsentedClauses([])
    setConsentedMiniClauses([])
  };

  const value = {
    indemnityClauses,
    miniIndemnityClauses,
    consentedClauses,
    consentedMiniClauses,
    isIndemnitySignReady,
    indemnityDescription,
    clientIndemnity,
    isIndemnitySigned,
    dateCaptured,
    handleClauseCheck,
    handleMiniClauseCheck,
    resetPage,
    handleSubmit,
    handleSignConfirm,
    handleRevokeClick,
    handleIndemnityRevoke
  }

  return (
    <IndemnityContext.Provider value={value}>
      {children}
    </IndemnityContext.Provider>
  )
}

export const useIndemnity = () => {
  const context = useContext(IndemnityContext);
  if (!context) {
    throw new Error('useIndemnity must be used within an IndemnityProvider');
  }
  return context;
};