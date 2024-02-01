import React from 'react'

interface ButtonLrgProps {
  text: string,
  handleClick?: () => void
} 

const ButtonLrg = ({ text, handleClick } : ButtonLrgProps) => {
  return (
    <button 
      className='text-[var(--font-heading)] uppercase tracking-[0.1em] font-bold border-2 border-white py-2 px-4 rounded-full mb-10 text-sm'
      onClick={handleClick}
    >
      {text}
    </button>
  )
}

export default ButtonLrg