import React from 'react'

export default ({icon, color}) => {
  const className = color ? `fas fa-${icon} ${color}` : `fas fa-${icon}`

  return <i className={className}/>
}
