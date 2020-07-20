import React, {Component} from 'react'
import {connect} from 'react-redux'
import {authenticate} from 'app/auth/state'
import {registerFields} from 'app/auth/constants'
import {SubmitButton} from 'components'
import {Button} from 'components/bootstrap'
import {Form} from 'modules/form'
import Alert from 'react-bootstrap/Alert'

const authEnhancer = connect(
  state => ({
    loading: state.auth.isLoading,
    errors: state.auth.errors,
  }), {authenticate})

export class Register extends Component {
  render() {
    const {loading, authenticate, errors, history} = this.props

    return (
      <div className="sign-up-root">
        <div className="mx-auto min-vh-100 d-flex justify-content-center align-items-center" style={{maxWidth: '512px'}}>
          <div className="shadow p-5 bg-white rounded text-center w-100">
            <h1 className="mb-3">Sign Up</h1>
            {errors && Object.values(errors).map((value, idx) =>
              <Alert key={idx} variant="danger">{value}</Alert>
            )}
            <Form
              onSubmit={authenticate}
              fields={registerFields}>
              <SubmitButton isLoading={loading} className="mb-4">Sign Up</SubmitButton>
              <Button variant="outline-dark" onClick={() => history.push('/signin')}>Already have an Account? Sign in</Button>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}

export default authEnhancer(Register)
