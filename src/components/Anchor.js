import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import 'resources/css/main.css'

export class Anchor extends Component {
  render() {
    const {path, className, value} = this.props

    return (
      <Link
        className={className || 'anchor'}
        to={path}>{value}</Link>
    )
  }
}

export default Anchor
