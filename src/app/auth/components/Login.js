import React from 'react'
import {connect} from 'react-redux'
import {Component} from 'app/utils'
import {authenticate} from 'app/auth/state'
import {loginFields} from 'app/auth/constants'
import {SubmitButton, Card} from 'components'
import {Button} from 'components/bootstrap'
import {Alert, Container} from 'react-bootstrap'
import {Form} from 'modules/form'

const authEnhancer = connect(
  state => ({
    loading: state.auth.isLoading,
    errors: state.auth.errors,
  }), {authenticate})

class Login extends Component {
  render() {
    const {loading, authenticate, errors, history} = this.props

    return (
      <div className="login-root">
        <div className="mx-auto min-vh-100 d-flex justify-content-center align-items-center" style={{maxWidth: '512px'}}>
          <div className="shadow p-5 bg-white rounded text-center w-100">
            <h1 className="mb-3">Sign In</h1>
            {errors && Object.values(errors).map((value, idx) =>
              <Alert key={idx} variant="danger">{value}</Alert>
            )}
            <Form
              onSubmit={data => authenticate(data, true)}
              resetPassword={true}
              fields={loginFields}>
              <SubmitButton isLoading={loading} className="mb-4">Login</SubmitButton>
              <Button block size="sm" variant="outline-secondary" onClick={() => history.push('/signup')}>Don't have an Account? Sign up</Button>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}

export default authEnhancer(Login)
