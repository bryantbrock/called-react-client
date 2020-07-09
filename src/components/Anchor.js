import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export class Anchor extends Component {
  render() {
    const {path, className, children} = this.props

    return (
      <Link
        className={className + ' anchor'}
        to={path}>{children}</Link>
    )
  }
}

export default Anchor
