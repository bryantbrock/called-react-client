import React, {Component} from 'react'
import {connect} from 'react-redux'
import {authenticate} from 'app/auth/state'
import {registerFields} from 'app/auth/constants'
import {SubmitButton, Anchor} from 'components'
import {Form} from 'modules/form'

const authEnhancer = connect(
  state => ({loading: state.auth.isLoading}), {authenticate})

export class Register extends Component {
  render() {
    const {loading, authenticate} = this.props

    return (
      <div className="sign-up-root">
        <div className="shadow p-5 bg-white rounded text-center">
          <h2>Sign Up</h2>
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
