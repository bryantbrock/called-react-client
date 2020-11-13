import React from 'react'
import {connect} from 'react-redux'
import {Component} from 'app/utils'
import {authenticate} from 'app/auth/state'
import {loginFields} from 'app/auth/constants'
import {SubmitButton, Container, Card} from 'components'
import {Alert, Button} from 'react-bootstrap'
import {Form} from 'modules/form'
import history from 'app/history'

const authEnhancer = connect(
  state => ({
    loading: state.auth.isLoading,
    errors: state.auth.errors,
    isAuthenticated: state.auth.isAuthenticated,
  }), {authenticate})

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      next: '/',
    }
  }

  componentDidMount() {
    var next = new URLSearchParams(this.props.location.search).get('next')
    if (!next) {
      next = '/';
    }
    this.setState({
      next: next,
    });
    if (this.props.isAuthenticated) {
      history.push(next);
    }
  }

  render() {
    const {loading, authenticate, errors, history} = this.props
    const signupURL = this.state.next == '/' ? '/signup' : `/signup?next=${this.state.next}`

    return <Container>
        <Card className="m-3">
          <img style={{maxWidth:128}} src={process.env.PUBLIC_URL + '/swords-shovels-blue.png'} alt="Logo" />
          <h1 className="mb-3">NSA Events</h1>
          {errors && Object.values(errors).map((value, idx) =>
            <Alert key={idx} variant="danger">{value}</Alert>)}
          <Form
            onSubmit={data => authenticate(data, true, this.state.next)}
            resetPassword={true}
            fields={loginFields}>
            <SubmitButton style={{backgroundColor:'#0d3666',borderColor:'#0d3666'}} isLoading={loading} className="mb-4">Login</SubmitButton>
            <Button block size="sm" variant="outline-secondary" onClick={() => history.push(signupURL)}>Don't have an Account? Sign up</Button>
          </Form>
        </Card>
    </Container>
  }
}

export default authEnhancer(Login)
