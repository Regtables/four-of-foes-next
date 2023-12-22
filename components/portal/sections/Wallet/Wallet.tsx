import React from 'react'
import SectionLayout from '../../layout/SectionLayout'
import PortalLinkList from '../../PortalLinkList/PortalLinkList'

const Wallet = () => {
  const LINKS = [
    {
      link: 'deposit'
    },
    {
      link: 'tattoo'
    },
    {
      link: 'calendar',
      type: 'calendar',
      data: {
        date: new Date()
      }
    },
  ]
  return (
    <SectionLayout>
      <div className='h-full flex items-center min-w-[40%]'>
        <PortalLinkList links={LINKS} />
      </div>
    </SectionLayout>
  )
}

export default Wallet