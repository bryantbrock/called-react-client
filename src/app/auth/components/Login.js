import React from 'react'
import {connect} from 'react-redux'
import {Component} from 'app/utils'
import {authenticate} from 'app/auth/state'
import {loginFields} from 'app/auth/constants'
import {SubmitButton, Container, Card} from 'components'
import {Alert, Button} from 'react-bootstrap'
import {Form} from 'modules/form'

const authEnhancer = connect(
  state => ({
    loading: state.auth.isLoading,
    errors: state.auth.errors,
    isAuthenticated: state.auth.isAuthenticated,
  }), {authenticate})

class Login extends Component {
  render() {
    const {loading, authenticate, errors, history, isAuthenticated} = this.props
    if (isAuthenticated) {
      history.push('/dashboard')
      return <div></div>
    }

    return <Container>
        <Card className="m-3">
          <h1 className="mb-3">Sign In</h1>
          {errors && Object.values(errors).map((value, idx) =>
            <Alert key={idx} variant="danger">{value}</Alert>)}
          <Form
            onSubmit={data => authenticate(data, true)}
            resetPassword={true}
            fields={loginFields}>
            <SubmitButton isLoading={loading} className="mb-4">Login</SubmitButton>
            <Button block size="sm" variant="outline-secondary" onClick={() => history.push('/signup')}>Don't have an Account? Sign up</Button>
          </Form>
        </Card>
    </Container>
  }
}

export default authEnhancer(Login)
