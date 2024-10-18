import React, { Fragment } from 'react'
import { format } from 'date-fns'

import { useIndemnity } from '@/context/IndemnityContext'

import ViewMotionWrapper from '@/components/layout/Motion/ViewMotionWrapper'

const IndemnityDateCaptured = () => {
  const { isIndemnitySigned, clientIndemnity, dateCaptured } = useIndemnity()

  return (
    <Fragment>
      {dateCaptured && dateCaptured !== '' && (
        <ViewMotionWrapper className="flex flex-col gap-2 mt-6" duration={1}>
          <div className="uppercase text-[8px] tracking-[0.2em] text-[#a9a9a9] text-center">
            date captured
          </div>
          <div className="title text-center">
            {format(new Date(dateCaptured), "dd MMMM yyyy")}
          </div>
        </ViewMotionWrapper>
      )}
    </Fragment>
  )
}

export default IndemnityDateCaptured