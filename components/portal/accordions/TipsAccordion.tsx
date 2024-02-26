import React from 'react'
import AccordionLayout from '../layout/AccordionLayout'
import PrepCard from '../prep/PrepCard'

const TipsAccordion = ({ data }) => {
  return (
    <AccordionLayout title='prep card'>
      <PrepCard tips={data} />
    </AccordionLayout>
  )
}

export default TipsAccordion