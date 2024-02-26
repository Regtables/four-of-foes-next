import React from 'react'
import AccordionLayout from '../layout/AccordionLayout'
import PrepCard from '../prep/PrepCard'

const TipsAccordion = ({ data }) => {
  return (
    <AccordionLayout title='prep card' section={2}>
      <PrepCard tips={data} />
    </AccordionLayout>
  )
}

export default TipsAccordion