import React from 'react'
import {Component} from 'app/utils'
import {Alert} from 'react-bootstrap'
import {Form} from 'modules/form'
import {SubmitButton, Container, Card} from 'components'
import {confirmPin, setNewPassword} from 'app/requests'
import history from 'app/history'

const pin = [{label: 'Pin', name: 'token'}]
const resetPassword = [
  {label: 'New Password', name: 'password', type: 'password'},
  {label: 'Confirm Password', name: 'verify', type: 'password'},
]

export class Confirmation extends Component {
  state = {
    success: false,
    isConfirmed: false,
    loading: false,
    confirmationFailed: false,
    token: null,
  }
  async onPinSubmit(data) {
    this.setState({loading: true, confirmationFailed: false})

    await confirmPin(data)
      .then(async () => {
        this.setState({loading: false, success: true, token: data.token})
        setTimeout(() => this.setState({isConfirmed: true, success: false}), 1000)
      })
      .catch(err => this.setState({loading: false, confirmationFailed: true}))
  }
  async onPasswordSubmit(data) {
    this.setState({loading: true, confirmationFailed: false})

    if (data.password !== data.verify) {
      return this.setState({loading: false, confirmationFailed: true})
    }

    await setNewPassword({...data, token: this.state.token})
      .then(() => {
        this.setState({loading: false, success: true})
        setTimeout(() => history.push('/signin'), 1000)
      })
      .catch(err => this.setState({loading: false, confirmationFailed: true}))
  }
  render() {
    const {
      isConfirmed, loading, success, confirmationFailed,
    } = this.state

    return <Container align="center" justify="center">
      {!isConfirmed ?
        <Card>
          <h3 className="mb-2">Confirmation</h3>
          <p className="text-muted text-center pb-2">
            Enter the pin found in the email we sent you.
          </p>
          {confirmationFailed && <Alert variant="danger">Invalid pin. Please try again.</Alert>}
          <Form
            onSubmit={this.onPinSubmit}
            fields={pin}>
            <SubmitButton variant={success ? "success" : "primary"} isLoading={loading}>
              {!success ? 'Submit' : <i class="fas fa-check" />}
            </SubmitButton>
          </Form>
        </Card> :
        <Card>
          <h3 className="mb-3">Reset Password</h3>
          <p className="text-muted text-center pb-2">
            Enter a new password.
          </p>
          {confirmationFailed && <Alert variant="danger">Passwords do not match. Please try again.</Alert>}
          <Form
            onSubmit={this.onPasswordSubmit}
            fields={resetPassword}>
            <SubmitButton variant={success ? "success" : "primary"} isLoading={loading}>
              {!success ? 'Save' : <i class="fas fa-check" />}
            </SubmitButton>
          </Form>
        </Card>}
      </Container>
  }
}

export default Confirmation
