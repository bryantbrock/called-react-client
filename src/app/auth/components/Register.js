import React, {Component} from 'react'
import {connect} from 'react-redux'
import {authenticate} from 'app/auth/state'
import {registerFields} from 'app/auth/constants'
import {SubmitButton, Anchor} from 'components'
import {Form} from 'modules/form'
import Alert from 'react-bootstrap/Alert'

const authEnhancer = connect(
  state => ({
    loading: state.auth.isLoading,
    errors: state.auth.errors,
  }), {authenticate})

export class Register extends Component {
  render() {
    const {loading, authenticate, errors} = this.props

    return (
      <div className="sign-up-root">
        <div className="shadow p-5 bg-white rounded text-center">
        <h1 className="mb-4 text-2xl">Sign Up</h1>
          {errors && Object.values(errors).map((value, idx) => 
              <Alert key={idx} variant="danger">{value}</Alert>
            )}
          <Form
            onSubmit={authenticate}
            fields={registerFields}>
            <SubmitButton isLoading={loading} className="mb-4">Sign Up</SubmitButton>
            <Anchor path="/login">Already have an Account? Login</Anchor>
          </Form>
        </div>
      </div>
    )
  }
}

export default authEnhancer(Register)
