import React, {Component} from 'react'
import PropType from 'prop-types'
import {Input} from 'components'
import {toObj} from 'utils/misc'
import 'resources/css/main.css'


class Form extends Component {

  state = toObj(this.props.fields, 'name')

  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }
  onSubmit(e) {
    e.preventDefault()
    this.props.onSubmit(this.state)
  }
  renderFields(fields) {
    return fields.map(({label, name, type}) => 
      <Input 
        key={name}
        type={type}
        label={label}
        name={name}
        value={this.state[name]}
        onChange={e => this.onChange(e)} />
    )
  }
  render() {
    const {fields, children} = this.props

    return (
      <form
        onSubmit={e => this.onSubmit(e)}
        className="form">

        {this.renderFields(fields)}
        {children}

      </form>
    )
  }
}

Form.propTypes = {
  fields: PropType.array,
  onSubmit: PropType.func.isRequired,
}

export default Form