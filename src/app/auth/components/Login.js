import React, {Component} from 'react'
import {connect} from 'react-redux'
import {authenticate} from 'app/auth/state'
import {loginFields} from 'app/auth/constants'
import {Anchor, SubmitButton} from 'components'
import {Form} from 'modules/form'

const authEnhancer = connect(
  state => ({loading: state.auth.isLoading}), {authenticate})

class Login extends Component {
  render() {
    const {loading, authenticate} = this.props

    return (
      <div className="login-root">
        <div className="shadow p-5 bg-white rounded text-center">
          <h2>Login</h2>
          <Form
            onSubmit={data => authenticate(data, true)}
            fields={loginFields}>
            <SubmitButton isLoading={loading} className="mb-4">Login</SubmitButton>
            <Anchor path='/sign-up'>Don't have an Account? Sign up</Anchor>
          </Form>
        </div>
      </div>
    )
  }
}

export default authEnhancer(Login)
