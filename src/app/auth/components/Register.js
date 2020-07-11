import React, {Component} from 'react'
import {connect} from 'react-redux'
import {authenticate} from 'app/auth/state'
import {registerFields} from 'app/auth/constants'
import {SubmitButton, Card} from 'components'
import {Button} from 'components/bootstrap'
import {Form} from 'modules/form'
import Alert from 'react-bootstrap/Alert'
import {history} from 'app/history'

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
        <Card>
        <h1 className="mb-3">Sign Up</h1>
          {errors && Object.values(errors).map((value, idx) => 
              <Alert key={idx} variant="danger">{value}</Alert>
            )}
          <Form
            onSubmit={authenticate}
            fields={registerFields}>
            <SubmitButton isLoading={loading} className="mb-4">Sign Up</SubmitButton>
            <Button variant="outline-dark" onClick={() => history.push('/signin')}>Don't have an Account? Sign up</Button>
          </Form>
        </Card>
      </div>
    )
  }
}

export default authEnhancer(Register)
