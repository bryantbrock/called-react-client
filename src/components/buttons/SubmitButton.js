import React from 'react'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

export default ({children, className, variant, isLoading, style}) => {

  return <Button
    block
    className={className}
    style={style}
    type="submit"
    variant={variant}>
      {isLoading ? <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true" /> : children}
  </Button>
}
