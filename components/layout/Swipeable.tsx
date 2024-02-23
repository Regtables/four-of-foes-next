import React from 'react'
import { useSwipeable } from 'react-swipeable'

const Swipeable = ({ children, onLeft = () => {}, onRight = () => {}, onUp = () => {}, onDown = () => {} } : { children: any, onLeft?: any, onRight?: any, onUp?: any, onDown?: any }) => {
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      onLeft()
    },
    onSwipedRight: () => {
      onRight()
    },
    onSwipedDown: () => {
      onDown()
    },
    onSwipedUp: () => {
      onUp()
    }
  })
  return (
    <div { ...handlers} style={{height: '100%', width: '100%'}}>
      {children}
    </div>
  )
}

export default Swipeable