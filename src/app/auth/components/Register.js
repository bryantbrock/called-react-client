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

  constructor(props) {
    super(props);
    this.state = {
      next: '/',
    }
  }

  componentDidMount() {
    const next = new URLSearchParams(this.props.location.search).get('next')
    this.setState({
      next: next,
    })
  }

  render() {
    const {loading, authenticate, errors, history, next} = this.props

    return <Container>
      <Card className="m-3">
      <h1 className="mb-3">Sign Up</h1>
        {errors && Object.values(errors).map((value, idx) =>
          <Alert key={idx} variant="danger">{value}</Alert>
        )}
        <Form
          onSubmit={data => authenticate(data, false, this.state.next)}
          fields={registerFields}>
          <SubmitButton isLoading={loading} className="mb-4">Sign Up</SubmitButton>
          <Button variant="outline-dark" onClick={() => history.push('/signin')}>Already have an Account? Sign in</Button>
        </Form>
      </Card>
    </Container>
  }
}

export default authEnhancer(Register)
