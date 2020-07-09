import React from 'react'
import {Spinner} from 'components'

export default ({
  children, 
  className, 
  color, 
  isLoading,
  onClick,
}) => {

  return <button
    className={className}
    onClick={onClick}
    color={color}>
      {isLoading ?
        <Spinner /> : 
        <span>{children}</span>}
  </button>
}
