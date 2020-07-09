import React, {Component} from 'react'
import {connect} from 'react-redux'
import {submitAuthForm} from 'app/auth/state'
import {registerFields} from 'app/auth/constants'
import {clearErrors} from 'app/errors/state'
import {redirectOnSuccess} from 'app/auth/selectors'
import {SubmitButton, Anchor} from 'components'
import {AUTH_TYPES} from 'app/auth/constants'
import {Form} from 'modules/form'

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
  state = {
    loading: false,
  }
  onSubmit = async (data, path) => {
    const { submitAuthForm, clearErrors, history } = this.props

    clearErrors()
    this.setState({loading: true})
    await submitAuthForm(data, AUTH_TYPES.SIGN_UP)

    if (this.props.redirect) {
      history.push(`/${path}`)
      clearErrors()
    }

    this.setState({loading: false})
  }
  render() {
    const {loading} = this.state

    return (
      <div className="sign-up-root">
        <div className="shadow p-5 bg-white rounded text-center">
          <h2>Sign Up</h2>
          <Form
            onSubmit={data => this.onSubmit(data, 'dashboard')}
            fields={registerFields}>
            <SubmitButton isLoading={loading} className="mb-4">Sign Up</SubmitButton>
            <Anchor path="/login">"Already have an Account? Login"</Anchor>
          </Form>
        </div>
      </div>
    )
  }
}

export default authEnhancer(Register)
