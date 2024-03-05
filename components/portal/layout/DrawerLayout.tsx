'use client'

import React, { useRef, useState } from 'react'

const DrawerLayout = ({ title, children } : { title: string, children:React.ReactNode } ) => {
  const [toggle, setToggle] = useState(false)
  const [height, setHeight] = useState('0px')
  const content:any = useRef(null)

  const handleToggle = () => {
    if(toggle){
      setToggle(false)
      setHeight('0px')
    } else {
      setToggle(true)
      setHeight(`${content.current.scrollHeight}px`)
    }
  }
 
  return (
    <div>
      <div ref = {content} style={{ maxHeight: height}} className='overflow-hidden transition-all duration-700 mb-4'>
        {children}
      </div>

      <div onClick={handleToggle} className="text-center cursor-pointer text-[8px] uppercase tracking-[0.4em] text-[#a9a9a9] w-full active:text-black transition-colors rounded-sm">
        {title}
      </div>
    </div>
  )
}

export default DrawerLayout