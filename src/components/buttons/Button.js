import React, {Component} from 'react'
import {Spinner} from 'components'
import {connect} from 'react-redux'
import 'resources/css/main.css'

const enhanceButton = connect(
  state => ({
    isLoading: state.auth.isLoading,
  })
)

export class Button extends Component {
  render() {
    const {color, value, className, children} = this.props

    return (
      <button
        className={className}
        onClick={this.props.onClick}
        type="submit"
        color={color}>
          <span 
            hidden={this.props.isLoading}>
            {value || children}
          </span>
          <Spinner visible={this.props.isLoading} />
      </button>
    )
  }
}

export default enhanceButton(Button)
