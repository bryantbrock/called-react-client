import React, {Component} from 'react'
import {connect} from 'react-redux'
import {authenticate} from 'app/auth/state'
import {loginFields} from 'app/auth/constants'
import {Anchor, SubmitButton} from 'components'
import Alert from 'react-bootstrap/Alert'
import {Form} from 'modules/form'

const authEnhancer = connect(
  state => ({
    loading: state.auth.isLoading,
    errors: state.auth.errors,
  }), {authenticate})

class Login extends Component {
  render() {
    const {loading, authenticate, errors} = this.props

    return (
      <div className="login-root">
        <div className="shadow p-5 bg-white rounded text-center">
          <h1 className="mb-4 text-2xl">Login</h1>
          {errors && Object.values(errors).map((value, idx) => 
              <Alert key={idx} variant="danger">{value}</Alert>
            )}
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
