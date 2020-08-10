import React from 'react'
import {Component} from 'app/utils'
import {connect} from 'react-redux'
import {authenticate} from 'app/auth/state'
import {registerFields} from 'app/auth/constants'
import {SubmitButton, Container, Card} from 'components'
import {Form} from 'modules/form'
import {Alert, Button} from 'react-bootstrap'

const authEnhancer = connect(
  state => ({
    loading: state.auth.isLoading,
    errors: state.auth.errors,
  }), {authenticate})

export class Register extends Component {
  render() {
    const {loading, authenticate, errors, history} = this.props

    return <Container>
      <Card>
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
      </Card>
    </Container>
  }
}

export default authEnhancer(Register)
