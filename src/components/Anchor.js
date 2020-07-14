import React from 'react'
import {Component} from 'app/utils'
import {history} from 'app/history'

export class Anchor extends Component {
  onClick() {
    const {onClick} = this.props

    if (typeof onClick === 'string') {
      return history.push(onClick)
    }

    onClick()    
  }
  render() {
    const {children} = this.props

    return <a className="anchor" onClick={this.onClick}>{children}</a>
  }
}

export default Anchor
