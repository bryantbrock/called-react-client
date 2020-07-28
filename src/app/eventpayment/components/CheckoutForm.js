import React, {Component} from 'react'
import {Alert, Button, Col, Container, Form, Row, Spinner} from 'react-bootstrap'
import {ElementsConsumer, CardElement} from '@stripe/react-stripe-js';

class CheckoutForm extends React.Component {

  constructor(props) {
    super(props);
    this.submitCard = this.submitCard.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
    }
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    const {registrant, stripe} = this.props;
    return (
      <form onSubmit={(event) => registrant.stripe_setup_intent ? this.submitCard(event, registrant.stripe_setup_intent.client_secret, stripe.confirmCardSetup) : this.submitCard(event, registrant.stripe_payment_intent.client_secret, stripe.confirmCardPayment)}>
        { this.state.error &&
        <Alert variant="danger">
          {this.state.error}
        </Alert>
        }
        <Form.Group>
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
        <Button type="submit" variant="primary" block disabled={this.state.submitting}>{registrant.stripe_setup_intent ? 'Add Card' : 'Pay'}</Button>
      </form>
    )
  }

  submitCard(event, clientSecret, cardSubmitFunction) {
    event.preventDefault()
    const {elements, event_id} = this.props;
    const cardElement = elements.getElement(CardElement);
    this.setState({
      submitting: true,
    })
    let _this = this;
    let history = this.props.history;
    cardSubmitFunction(clientSecret, {
      payment_method: {
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
    })
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

export default inject(CheckoutForm)