import React from 'react'
import {Spinner} from 'components'
import 'resources/css/main.css'

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
