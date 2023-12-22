import React from 'react'

interface ButtonPillProps {
  text: string
}

const ButtonPill = ({ text } : ButtonPillProps) => {
  return (
    <button className='border border-1-white bg-white text-black w-full h-full rounded-full uppercase text-[10px] tracking-[0.4em] font-[500]'>
      {text}
    </button>
  )
}

export default ButtonPill