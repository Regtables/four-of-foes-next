import React from 'react'

import styles from '../IndemnityTile/IndemnityTile.module.scss'
import ViewMotionWrapper from '@/components/layout/Motion/ViewMotionWrapper'
import { MiniIndemnityClauseType } from '@/types'

const MiniIndemnityClause = ({ clause, handleCheck } : { clause: MiniIndemnityClauseType, handleCheck: any }) => {
  const { consentGiven, clause: text } = clause

  return (
    <div className= {styles.miniClause}>
      <div className= {styles.checkbox} onClick={() => handleCheck(clause)}>
        {consentGiven && (
          <ViewMotionWrapper y= {0}>
            <div className= {styles.check} />
          </ViewMotionWrapper>
        )}
      </div>

      <div className= {styles.clause}>
        <h4>{text}</h4>
      </div>
    </div>
  )
}

export default MiniIndemnityClause