import React, { Component } from 'react'
import { connect } from 'react-redux'
import { submitAuthForm } from 'app/auth/state'
import { registerFields } from 'app/auth/constants'
import { clearErrors } from 'app/errors/state'
import { redirectOnSuccess } from 'app/auth/selectors'
import { Header, Anchor, SubmitButton } from 'components'
import { AUTH_TYPES } from 'app/auth/constants'
import { Form } from 'modules/form'
import 'resources/css/pages.css'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'

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
    const { submitAuthForm, clearErrors, history } = this.props

    clearErrors()
    await submitAuthForm(data, AUTH_TYPES.SIGN_UP)

    if (this.props.redirect) {
      history.push(`/${path}`)
      clearErrors()
    }
  }
  render() {
    const anchor = { path: '/login', value: "Already have an Account? Login" }
    const button = { value: 'Sign Up', path: 'dashboard' }

    return (
      <div className="sign-up-root">
        <div className="shadow p-5 bg-white rounded text-center">
          <h2>Sign Up</h2>
          <Form
            onSubmit={data => this.onSubmit(data, button.path)}
            fields={registerFields}>
            <Button as="input" type="submit" value={button.value} block className="mb-4" />
            <Link to={anchor.path}>{anchor.value}</Link>
          </Form>
        </div>
      </div>
    )
  }
}

export default authEnhancer(Register)
