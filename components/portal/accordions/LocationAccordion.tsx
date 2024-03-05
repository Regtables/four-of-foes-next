import React from 'react'
import AccordionLayout from '../layout/AccordionLayout'
import ShopProfile from '../ShopProfile/ShopProfile'

interface LocationAccordionProps {
  data: any
}

const LocationAccordion: React.FC<LocationAccordionProps> = ({ data }) => {
  return (
    <AccordionLayout title='location' section={3} list>
      <ShopProfile shop={data} />
    </AccordionLayout>
  )
}

export default LocationAccordion