import React, { useState } from 'react'
import AccordionLayout from '../layout/AccordionLayout'
import FeedbackSlider from '../feedback/FeedbackSlider'

const FeedbackAccordion = () => {
  const [currentRating, setCurrentRating] = useState(50)

  return (
    <AccordionLayout title='feedback' section={3}>
      <div>
        <div className='mb-4 text-center'>How do you rate your experience?</div>

        <div>
          <FeedbackSlider currentRating={currentRating} />
        </div>
      </div>
    </AccordionLayout>
  )
}

export default FeedbackAccordion