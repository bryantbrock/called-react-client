import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Nav} from 'components'
import {Button, Col, Container, Form, Row, Spinner} from 'react-bootstrap'
import {fetchEvent} from 'app/event/actions.js'
import {fetchRegistrant} from 'app/eventregistration/actions.js'
import {store} from 'store.js'
import {Elements, CardElement, ElementsConsumer} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const enchanceEventRegistration = connect(
  (state, ownProps) => ({
    event: state.events.items.find(event => event.pk == ownProps.match.params.event_id),
    registrant: state.registrants.items.find(registrant => registrant.pk == ownProps.match.params.registrant_id),
    auth: state.auth,
    isFetching: state.events.isFetching || state.registrants.isFetching,
  }), {})

export class EventRegistration extends Component {
  constructor(props) {
    super(props);
    this.price_multiplier = this.props.registrant.discount_code ? 1 - (this.props.registrant.discount_code.amount / 100) : 1;
    this.stripe = loadStripe('pk_test_BJoAep1mAm2egz6kzXipBNYl');
  }

  componentDidMount() {
    const {auth, event, registrant} = this.props
    const {event_id, registrant_id} = this.props.match.params
    store.dispatch(fetchEvent(event_id, auth.user.token))
    store.dispatch(fetchRegistrant(registrant_id, auth.user.token))
  }

  render() {
    const {event, registrant} = this.props;
    const selected_plan = this.props.isFetching ? null : event.payment_plans.find(plan => plan.pk == registrant.payment_plan)
    let selected_plan_name = this.props.isFetching || !selected_plan ? '' : selected_plan.name;
    if (registrant.discount_code && !this.props.isFetching) {
      let og_amount = /of \$(\d+\.?\d+)/g.exec(selected_plan_name)[1]
      let new_amount = (parseFloat(og_amount) * this.price_multiplier).toFixed(2)
      selected_plan_name = selected_plan_name.replace(new RegExp('of \\$' + og_amount), `of <s>$${og_amount}</s> $${new_amount}`);
    }
    return <div className="events-root">
      <Nav />
      <Container className="mt-5">
        {this.props.isFetching ? <div className="text-center"><Spinner animation="border" /></div> : <div>
          <Row>
            <Col sm={12} md={6} className="mt-4">
              <img className="w-100" src={event.image_source} alt={event.name} />
              <p className="mb-0 mt-2 lead">{event.name}</p>
              <h3>{registrant.discount_code ? <span><s>${event.price}</s> ${(event.price * this.price_multiplier).toFixed(2)}</span> : <span>${event.price}</span>}</h3>
              {registrant.stripe_setup_intent ?
                <span><p>Please add a payment method now to reserve your spot. This payment method will be charged automatically.</p>
                  <p>Based on the plan you have selected, you will be charged {selected_plan_name}. Your first payment will be charged immediately.</p></span>
                : <p>Please make your payment now to reserve your spot. Your card will be charged immediately.</p>}
            </Col>
            <Col sm={12} md={6} className="mt-4">
              <h2>{registrant.stripe_setup_intent ? 'Add a Card' : 'Pay With Card'}</h2>
            <Elements stripe={this.stripe}>
              <CheckoutForm registrant={registrant} event_id={event.pk} />
            </Elements>
            </Col>
          </Row>
        </div>}
      </Container>
    </div>
  }
}

export default enchanceEventRegistration(EventRegistration)
