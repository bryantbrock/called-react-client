import React, {Component} from 'react'
import {connect} from 'react-redux'
import {submitAuthForm} from 'app/auth/state'
import {clearErrors} from 'app/errors/state'
import {loginFields} from 'app/auth/constants'
import {redirectOnSuccess} from 'app/auth/selectors'
import {Anchor, SubmitButton} from 'components'
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

class Login extends Component {
  state = {loading: false}
  onSubmit = async (data, path) => {
    const {submitAuthForm, clearErrors, history} = this.props

    clearErrors()
    this.setState({loading: true})
    
    await submitAuthForm(data, AUTH_TYPES.SIGN_IN)

     if (this.props.redirect) {
      history.push(`/${path}`)
      clearErrors()
    }

    this.setState({loading: false})
  }
  render() {
    const {loading} = this.state

    return (
      <div className="login-root">
        <div className="shadow p-5 bg-white rounded text-center">
          <h2>Login</h2>
          <Form
            onSubmit={data => this.onSubmit(data, 'dashboard')}
            fields={loginFields}>
            <SubmitButton isLoading={loading} className="mb-4">Login</SubmitButton>
            <Anchor path='/sign-up'>"Don't have an Account? Sign up"</Anchor>
          </Form>
        </div>
      </div>
    )
  }
}

export default authEnhancer(Login)
