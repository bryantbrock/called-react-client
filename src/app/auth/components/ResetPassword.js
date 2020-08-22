import React from 'react'
import {Component} from 'app/utils'
import {Container, Card} from 'components'
import {Form} from 'modules/form'
import {SubmitButton} from 'components'
import history from 'app/history'
import {sendResetEmail} from 'app/requests'
import {Alert} from 'react-bootstrap'

const email = [{label: 'Email', name: 'email', type: 'email'}]

export class ResetPassword extends Component {
  state = {
    loading: false,
    failed: false,
  }
  async onSubmit(data) {
    this.setState({loading: true})

    await sendResetEmail(data)
      .then(() => history.push('/confirm-reset'))
      .then(() => this.setState({loading: false}))
      .catch(err => this.setState({loading: false, failed: true}))
  }
  render() {
    const {loading, failed} = this.state

    return <Container>
      <Card className="m-3">
        <h3 className="mb-2">Forgot Password</h3>
        <p className="text-muted text-center pb-2">
          We will send you an email with a <br /> pin for confirmation.
        </p>
        {failed && <Alert variant="danger">No account was found with that email.</Alert>}
        <Form
          onSubmit={this.onSubmit}
          fields={email}>
          <SubmitButton isLoading={loading}>Send Email</SubmitButton>
        </Form>
      </Card>
    </Container>
  }
}

export default ResetPassword
