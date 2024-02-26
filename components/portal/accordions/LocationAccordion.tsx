import React from 'react'
import AccordionLayout from '../layout/AccordionLayout'
import ShopProfile from '../ShopProfile/ShopProfile'

const LocationAccordion = ({ data }) => {
  return (
    <AccordionLayout title='location'>
      <ShopProfile shop={data} />
    </AccordionLayout>
  )
}

export default LocationAccordion