import React, {Component} from 'react'
import PropType from 'prop-types'
import {toObj} from 'utils/misc'
import {Anchor} from 'components'
import {Form as BSForm} from 'components/bootstrap'

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
      <BSForm.Group key={name}>
        <BSForm.Control 
          type={type}
          placeholder={label}
          name={name}
          value={this.state[name]}
          onChange={e => this.onChange(e)} />
        {(name === 'password' && this.props.resetPassword) && 
          <BSForm.Text className="text-muted text-right">
            <Anchor onClick="/reset-password">
              Forgot Password?
            </Anchor>
          </BSForm.Text>}
        </BSForm.Group>)
  }
  render() {
    const {fields, children} = this.props

    return (
      <BSForm
        onSubmit={e => this.onSubmit(e)}>

        {this.renderFields(fields)}
        {children}

      </BSForm>
    )
  }
}

Form.propTypes = {
  fields: PropType.array,
  onSubmit: PropType.func.isRequired,
}

export default Form