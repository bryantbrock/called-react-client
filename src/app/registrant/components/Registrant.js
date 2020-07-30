import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Nav} from 'components'
import {Alert, Button, Card, Col, Container, Row, Spinner, Tab, Tabs} from 'react-bootstrap'
import {Form} from 'react-formio';
import {fetchEvent} from 'app/event/actions.js'
import {createRegistrant} from 'app/eventregistration/actions.js'
import {store} from 'store.js'
import {LinkContainer} from 'react-router-bootstrap'

const enchanceRegistrant = connect(
  (state, ownProps) => ({
    event: state.events.items.find(event => event.pk == ownProps.match.params.event_id),
    registrant: state.registrants.items.find(registrant => registrant.pk == ownProps.match.params.registrant_id),
    auth: state.auth,
    isFetching: state.events.isFetching || state.registrants.isFetching,
  }), {})

export class Registrant extends Component {

  render() {
    const {event, registrant} = this.props;
    const selected_plan = this.props.isFetching ? null : event.payment_plans.find(plan => plan.pk == registrant.payment_plan)
    const paymentMethod = registrant.stripe_setup_intent ? registrant.stripe_setup_intent.payment_method : null
    return <div className="events-root">
      <Nav />
      <Container className="mt-5">
        {this.props.isFetching ? <div className="text-center"><Spinner animation="border" /></div> : <div>
          <h1>{registrant.name}</h1>
          {registrant.payment_status == 0 && <Alert variant="danger" className="mt-2" dismissible>
            <Alert.Heading>Your registration is incomplete.</Alert.Heading>
            <p>{registrant.stripe_setup_intent ? 'Add a card to complete your registration.' : 'Pay now to complete your registration.'}</p>
            <LinkContainer to={`/event/${event.pk}/pay/${registrant.pk}`}><Button variant="light">{registrant.stripe_setup_intent ? 'Add a Card' : 'Pay With Card'}</Button></LinkContainer>
          </Alert>}
          <Tabs id="uncontrolled-tab-example" className="mt-5">
            <Tab className="p-3" eventKey="registration_information" title="Registration Information">
              <Form submission={{data: registrant.registration_information}} options={{readOnly: true}} form={event.registration_form} />
            </Tab>
            <Tab className="p-3" eventKey="billing" title="Billing">
              <p><b>Payment plan:</b> {selected_plan ? selected_plan.name : 'None'}</p>
              {registrant.stripe_setup_intent && registrant.payment_status != 0 && <Row className="p-2" noGutters>
                <Col md="auto" className="mr-2"><img style={{height:48}} src={`/card-images/${paymentMethod.card.brand}.png`} /></Col>
                <Col>•••• {paymentMethod.card.last4}<br /><small className="text-muted">Expires {paymentMethod.card.exp_month.toString().padStart(2, '0')}/{paymentMethod.card.exp_year}</small></Col>
              </Row>}
            </Tab>
          </Tabs>
        </div>}
      </Container>
    </div>
  }

  submitForm(submission) {
    const {event_id} = this.props.match.params
    this.setState({
      submittedRegistrationInfo: true,
      registrant: {
        registration_information: submission.data,
        event: event_id,
      }
    })
  }

  register() {
    this.setState({
      submitting: true,
    })
    store.dispatch(createRegistrant(this.state.registrant, this.props.auth.user.token))
  }

  registerWithPlan(plan) {
    this.setState(prevState => ({
      registrant: {
        ...prevState.registrant,
        payment_plan: plan,
      }
    }), this.register)
  }
}

export default enchanceRegistrant(Registrant)
