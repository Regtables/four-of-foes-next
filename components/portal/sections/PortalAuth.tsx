'use client'

import React, { Fragment, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Asterisk } from 'lucide-react'

import { ClientType } from '@/types'
import { useAuth } from '@/hooks/useAuth'
import { useModal } from '@/context/ModalContext'

import ButtonLrg from '../../buttons/ButtonLrg'

const PortalAuth = ({ client } : { client: ClientType }) => {
  const { handleModalOpen, handleModalClose } = useModal()
  const router = useRouter()

  console.log(client)

  useEffect(() => {
    if(!client){
      handleModalOpen('alert', { alert: {
        title: 'Could not find client profile',
        content: 'We could not find your profile on our system, please confirm your sign in link.',
        confirm: 'Okay',
        handleConfirm: () => {
          handleModalClose('alert')
          router.push('/')
        }
      }})
    }
  }, [client])

  const handleButtonClick = async () => {
    try{
      router.push('/portal/pre')
      // await signInClient(client)
    } catch (error){
      console.log(error)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center gap-4 border-2 border-[var(--color-gold)] rounded-[20px] h-[50%] w-[85%] lg:h-[60%] lg:w-[40%]'>
      {client ? (
        <Fragment>
          <div className='text-[var(--color-gold)] uppercase tracking-[0.2em] text-2xl font-semibold heading-font'>
            Welcome, Patron
          </div>
          <Asterisk size = {10}/>
          <div className='w-[60%] text-center text-[12px] mb-4 tracking-[0.05em]'>
            Hi, {client.clientName}.
            Welcome to the Four of Foes booking Lounge. Kindly review our <span className='underline'>terms and conditions</span>, and then proceed.
          </div>

          <div onClick={handleButtonClick}>
            <ButtonLrg text='Enter Lounge' />
          </div>
        </Fragment>
      ) : (
        <Fragment></Fragment>
      )}
    </div>
  )
}

export default PortalAuth