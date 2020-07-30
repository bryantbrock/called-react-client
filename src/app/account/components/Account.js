import React from 'react'
import {Component} from 'app/utils'
import {connect} from 'react-redux'
import {Button, Nav, Display} from 'components'
import {Auth} from 'app/auth/state'
import {Col, Container, ListGroup, Row, Form, Spinner} from 'react-bootstrap'
import {store} from 'store.js'
import {fetchPaymentMethods} from '../actions'

const enchanceAccount = connect(
  (state, ownProps) => ({
    auth: state.auth,
    paymentMethods: state.paymentMethods,
  }), {})

export class Account extends Component {
  componentDidMount() {
    store.dispatch(fetchPaymentMethods(this.props.auth.user.token))
  }

  render() {
    const {auth, paymentMethods} = this.props
    return (
      <div className="account-root">
        <Nav />
        <Container className="mt-5">
          <h1>Account</h1>
          <hr />
          <h2 className="mt-3">Personal Information</h2>
          <Form.Label>Name</Form.Label>
          <Form.Row>
            <Col>
              <Form.Control disabled placeholder="First name" value={auth.user.first_name} />
            </Col>
            <Col>
              <Form.Control disabled placeholder="Last name" value={auth.user.last_name} />
            </Col>
          </Form.Row>
          <Form.Group className="mt-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control disabled type="email" placeholder="Email" value={auth.user.email} />
          </Form.Group>
          <h2 className="mt-5 mb-4">Payment Methods</h2>
          {paymentMethods.isFetching ? <div className="text-center"><Spinner animation="border" /></div> : <div>
            <ListGroup className="mb-5">
            {paymentMethods.items.map((paymentMethod, index) => 
              <ListGroup.Item key={index}>
                <Row className="p-2" noGutters>
                  <Col xs="auto" className="mr-2"><img style={{height:48}} src={`card-images/${paymentMethod.card.brand}.png`} /></Col>
                  <Col>•••• {paymentMethod.card.last4}<br /><small className="text-muted">Expires {paymentMethod.card.exp_month.toString().padStart(2, '0')}/{paymentMethod.card.exp_year}</small></Col>
                </Row>
              </ListGroup.Item>)}
            </ListGroup>
          </div>}
        </Container>
      </div>
    )
  }
}

export default enchanceAccount(Account)
