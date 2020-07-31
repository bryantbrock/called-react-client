import React from 'react'
import {Component} from 'app/utils'
import {Card} from 'components'
import {Form} from 'modules/form'
import {SubmitButton} from 'components'
import {confirmPin, setNewPassword} from 'app/requests'

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
  }
  async onPinSubmit(data) {
    this.setState({loading: true})

    await confirmPin(data)
      .then(async () => {
        this.setState({loading: false, success: true})
        setTimeout(() => this.setState({isConfirmed: true}), 1000)
      })
      .catch(err => 'invalid pin error')
  }
  async onPasswordSubmit(data) {
    this.setState({loading: true})

    await setNewPassword(data)
      .then(() => this.setState({loading: false}))
      .catch(err => 'passwords do not match')
  }
  render() {
    const {isConfirmed, loading, success} = this.state

    return <div className="login-root">
      <div className="mx-auto min-vh-100 d-flex justify-content-center align-items-center" style={{maxWidth: '512px'}}>
        {!isConfirmed ?
          <div className="shadow p-5 bg-white rounded text-center w-100">
            <h3 className="mb-2">Confirmation</h3>
            <p className="text-muted text-center pb-2">
              Enter the pin found in the email we sent you.
            </p>
            <Form
              onSubmit={this.onPinSubmit}
              fields={pin}>
              <SubmitButton variant={success ? "success" : "primary"} isLoading={loading}>
                {!success ? 'Submit' : <i class="fas fa-check" />}
              </SubmitButton>
            </Form>
          </div> : <div className="shadow p-5 bg-white rounded text-center w-100">
            <h3 className="mb-3">Reset Password</h3>
            <p className="text-muted text-center pb-2">
              Enter a new password.
            </p>
            <Form
              onSubmit={this.onPasswordSubmit}
              fields={resetPassword}>
              <SubmitButton isLoading={loading}>Save</SubmitButton>
            </Form>
          </div>}
      </div>
    </div>
  }
}

export default Confirmation
