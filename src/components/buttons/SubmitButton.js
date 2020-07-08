import React from 'react'
import {Spinner} from 'components'
import 'resources/css/main.css'

export default ({children, className, color, isLoading}) => {

  return <button
    className={className}
    type="submit"
    color={color}>
      {isLoading ?
        <Spinner /> : 
        <span>{children}</span>}
  </button>
}
