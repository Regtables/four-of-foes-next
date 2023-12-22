'use client'

import { Dot } from 'lucide-react'
import React from 'react'
import { motion } from 'framer-motion'
import ViewMotionWrapper from '@/components/layout/Motion/ViewMotionWrapper'

const PrepCard = ({ tips } : { tips?: string[] }) => {
  return (
    <motion.div 
      className='border border-1-white p-4 rounded-xl flex flex-col gap-2'
      whileInView={{opacity: [0,1]}}
      transition={{ duration: 0.3 }}
      initial = {{opacity: 0}}
    >
      {tips?.map((tip, i) => (
        <ViewMotionWrapper y = {-5} delay={i*0.05} duration={0.2} key = {i}>
          <div className='flex text-[9px] italic tracking-[0.1em] font-light items-center'>
            <Dot />
            {tip}
          </div>
        </ViewMotionWrapper>
      ))}
    </motion.div>
  )
}

export default PrepCard