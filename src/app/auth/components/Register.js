import React, {Component} from 'react'
import {connect} from 'react-redux'
import {submitAuthForm} from 'app/auth/state'
import {registerFields} from 'app/auth/constants'
import {clearErrors} from 'app/errors/state'
import {redirectOnSuccess} from 'app/auth/selectors'
import {Header, Anchor, SubmitButton} from 'components'
import {AUTH_TYPES} from 'app/auth/constants'
import {Form} from 'modules/form'
import 'resources/css/pages.css'

const authEnhancer = connect(
  state => ({
    redirect: redirectOnSuccess(state),
  }),
  {
    submitAuthForm,
    clearErrors,
  }
)

export class Register extends Component {
  onSubmit = async (data, path) => {
    const {submitAuthForm, clearErrors, history} = this.props

    clearErrors()
    await submitAuthForm(data, AUTH_TYPES.SIGN_UP)

    if (this.props.redirect) {
      history.push(`/${path}`)
      clearErrors()
    }
  }
  render() {
    const anchor = {path: '/login', value: "Already have an Account? Login"}
    const button = {value: 'Sign Up', path: 'dashboard'}
    
    return (
      <div className="sign-up-root">
        <Header>Sign Up</Header>
        <Form
          onSubmit={data => this.onSubmit(data, button.path)}
          fields={registerFields}>
          <Anchor path={anchor.path}>{anchor.path}</Anchor>
          <SubmitButton>{button.value}</SubmitButton>
        </Form>
    </div>
    )
  }
}

export default authEnhancer(Register)
