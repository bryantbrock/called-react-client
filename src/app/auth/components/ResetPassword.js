import React from 'react'
import {Component} from 'app/utils'
import {Card} from 'components'
import {Form} from 'modules/form'
import {SubmitButton} from 'components'
import history from 'app/history'
import {sendResetEmail} from 'app/requests'

const email = [{label: 'Email', name: 'email', type: 'email'}]

export class ResetPassword extends Component {
  state = {
    loading: false,
  }
  async onSubmit(data) {
    this.setState({loading: true})

    await sendResetEmail(data)
      .then(() => history.push('/confirm-reset'))
      .then(() => this.setState({loading: false}))
      .catch(err => 'no user exists with that email error')
  }
  render() {
    const {loading} = this.state
    return <div className="login-root">
      <Card>
        <h3 className="mb-2">Forgot Password</h3>
        <p className="text-muted text-center pb-2">
          We will send you an email with a <br /> pin for confirmation.
        </p>
        <Form
          onSubmit={this.onSubmit}
          fields={email}>
          <SubmitButton isLoading={loading}>Send Email</SubmitButton>
        </Form>
      </Card>
    </div>
  }
}

export default ResetPassword
