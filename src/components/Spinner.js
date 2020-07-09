import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

export default ({animation, size}) => {
  return <Spinner
    animation={animation || "border"}
    size={size || "sm"}
    role="status"
    aria-hidden="true" />
}
