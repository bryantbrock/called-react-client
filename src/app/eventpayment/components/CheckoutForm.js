import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Alert, Button, Col, Form, ListGroup, Row, Spinner} from 'react-bootstrap'
import {ElementsConsumer, CardElement} from '@stripe/react-stripe-js';
import {store} from 'store.js'
import {backgroundFetchPaymentMethods} from 'app/account/actions'

const enchanceCheckoutForm = connect(
  (state, ownProps) => ({
    auth: state.auth,
    paymentMethods: state.paymentMethods,
  }), {})

class CheckoutForm extends React.Component {
  componentDidMount() {
    store.dispatch(backgroundFetchPaymentMethods(this.props.auth.user.token))
  }

  constructor(props) {
    super(props);
    this.submitCard = this.submitCard.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.state = {
      submitting: false,
      error: '',
      city: '',
      line1: '',
      line2: '',
      postal_code: '',
      state: '',
      name: '',
      email: '',
      addingCard: false,
      savePaymentMethod: false,
    }
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleCheckboxChange(e) {
    this.setState({[e.target.name]: e.target.checked});
  }

  render() {
    const {registrant, stripe, paymentMethods} = this.props;
    return (
      <div className="checkout-form-root">
        {this.state.error &&
          <Alert variant="danger">
            {this.state.error}
          </Alert>
        }
        {this.state.addingCard || paymentMethods.items.length == 0 ?
          <form onSubmit={(event) => registrant.stripe_setup_intent ? this.submitCard(event, registrant.stripe_setup_intent.client_secret, stripe.confirmCardSetup) : this.submitCard(event, registrant.stripe_payment_intent.client_secret, stripe.confirmCardPayment, this.state.savePaymentMethod ? 'on_session' : false)}>
            {paymentMethods.items.length != 0 && <a href="#" onClick={() => this.setState({addingCard: false})}>Use a saved payment method</a>}
            <Form.Check checked={this.state.savePaymentMethod} type="checkbox" onChange={this.handleCheckboxChange} label="Save this payment method" name="savePaymentMethod" />
            <Form.Group className="mt-2">
              <Form.Control onChange={this.handleChange} value={this.state.email} name="email" type="email" placeholder="Email" required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Card Information</Form.Label>
              <CardElement
                className='form-control'
                options={{
                  style: {
                    invalid: {
                      color: '#9e2146',
                    },
                  },
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control name="name" onChange={this.handleChange} value={this.state.name} type="text" placeholder="Name on card" required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Billing address</Form.Label>
              <Form.Control name="line1" onChange={this.handleChange} value={this.state.line1} type="text" placeholder="Address Line 1" required />
            </Form.Group>
            <Form.Group>
              <Form.Control name="line2" onChange={this.handleChange} value={this.state.line2} type="text" placeholder="Address Line 2" />
            </Form.Group>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Control name="city" onChange={this.handleChange} value={this.state.city} placeholder="City" required />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Control name="state" onChange={this.handleChange} value={this.state.state} placeholder="State" required />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Control name="postal_code" onChange={this.handleChange} value={this.state.postal_code} placeholder="Zip" required />
              </Form.Group>
            </Form.Row>
            <Button type="submit" variant="primary" block disabled={this.state.submitting}>{this.state.submitting ? <Spinner size="sm" animation="border" /> : (registrant.stripe_setup_intent ? 'Add Card and Pay' : 'Pay')}</Button>
          </form> :
          <div>
            <ListGroup className="mb-5 mt-4">
              {paymentMethods.items.map((paymentMethod, index) =>
                <ListGroup.Item key={index}>
                  <Row className="p-2" noGutters>
                    <Col xs="auto" md="auto" className="mr-2"><img style={{height: 48}} src={`/card-images/${paymentMethod.card.brand}.png`} /></Col>
                    <Col>•••• {paymentMethod.card.last4}<br /><small className="text-muted">Expires {paymentMethod.card.exp_month.toString().padStart(2, '0')}/{paymentMethod.card.exp_year}</small></Col>
                    <Col md={12} lg="auto" className="mt-2 mt-lg-0"><Button disabled={this.state.submitting} onClick={(event) => registrant.stripe_setup_intent ? this.submitCard(event, registrant.stripe_setup_intent.client_secret, stripe.confirmCardSetup, false, paymentMethod.id) : this.submitCard(event, registrant.stripe_payment_intent.client_secret, stripe.confirmCardPayment, false, paymentMethod.id)}>{this.state.submitting ? <Spinner size="sm" animation="border" /> : 'Choose Card and Pay'}</Button></Col>
                  </Row>
                </ListGroup.Item>)}
              <ListGroup.Item action onClick={() => this.setState({addingCard: true})}>
                <p className="mt-2">Add a payment method</p>
              </ListGroup.Item>
            </ListGroup>
          </div>}
      </div>
    )
  }

  submitCard(event, clientSecret, cardSubmitFunction, setupFutureUsage = false, paymentMethod = null) {
    event.preventDefault()
    const {elements, event_id} = this.props;
    const cardElement = elements.getElement(CardElement);
    this.setState({
      submitting: true,
    })
    let _this = this;
    let history = this.props.history;
    let props = {
      payment_method: paymentMethod ? paymentMethod : {
        card: cardElement,
        billing_details: {
          address: {
            city: this.state.city,
            line1: this.state.line1,
            line2: this.state.line2,
            postal_code: this.state.postal_code,
            state: this.state.state,
          },
          name: this.state.name,
          email: this.state.email,
        }
      }
    }
    if (setupFutureUsage) {
      props.setup_future_usage = setupFutureUsage
    } 
    cardSubmitFunction(clientSecret, props)
      .then(function (result) {
        if (result.error) {
          _this.setState({
            submitting: false,
            error: result.error.message,
          })
        } else {
          _this.setState({
            submitting: false,
            error: '',
          })
          history.push(`/event/${event_id}`)
        }
      });
  };
}

function inject(CheckoutForm) {
  return class Injector extends React.Component {
    render() {
      return (
        <ElementsConsumer>
          {({stripe, elements}) => (
            <CheckoutForm {...this.props} stripe={stripe} elements={elements} />
          )}
        </ElementsConsumer>
      )
    };
  }
}

export default enchanceCheckoutForm(inject(CheckoutForm))