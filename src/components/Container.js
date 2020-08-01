import React from 'react'
import classNames from 'classnames'

export default ({
  children,
  mw = "512px",
  align = "center",
  justify = "center"
}) => {
  const className = classNames(
    'mx-auto',
    'min-vh-100',
    'd-flex',
    `justify-content-${justify}`,
    `align-items-${align}`,
  )

  return <div className={className} style={{maxWidth: mw}}>
    {children}
  </div>
}
