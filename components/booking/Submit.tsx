import React from 'react'
import ButtonPill from '../buttons/ButtonPill'

const Submit = ({ handleClick } : { handleClick: () => Promise<void> }) => {
  return (
    <div className='w-[150px] h-[40px] mx-auto' id = 'submit-btn' onClick = {handleClick}>
      <ButtonPill text='submit' fill type='button'/>
    </div>
  )
}

export default Submit