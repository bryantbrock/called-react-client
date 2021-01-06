import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Nav} from 'components'
import {
  Alert, Button, Col, Container, Row, Spinner, Tab, Tabs
} from 'react-bootstrap'
import {Form} from 'react-formio'
import {Badge, ListGroup} from 'react-bootstrap'
import {createRegistrant} from 'app/eventregistration/actions.js'
import {store} from 'store.js'
import {LinkContainer} from 'react-router-bootstrap'
import {fetchAdditionalForms} from '../actions.js'

const enchanceRegistrant = connect(
  (state, ownProps) => ({
    additionalForms: state.additionalForms.items.filter(item => item.id == ownProps.match.params.registrant_id),
    event: state.events.items.find(event => event.pk == ownProps.match.params.event_id),
    registrant: state.registrants.items.find(registrant => registrant.pk == ownProps.match.params.registrant_id),
    auth: state.auth,
    isFetching: state.events.isFetching || state.registrants.isFetching || state.additionalForms.isFetching,
  }), {})

export class Registrant extends Component {
  componentDidMount() {
    const {auth, registrant} = this.props
    store.dispatch(fetchAdditionalForms(registrant.pk, auth.user.token))
  }

  submitForm(submission) {
    const {event_id: eventId} = this.props.match.params

    this.setState({
      submittedRegistrationInfo: true,
      registrant: {
        registration_information: submission.data,
        event: eventId,
      }
    })
  }
  register() {
    this.setState({submitting: true})

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
  render() {
    const {additionalForms, event, registrant, isFetching} = this.props
    const selectedPlan = isFetching ? null : event.payment_plans.find(plan => plan.pk == registrant.payment_plan)
    const paymentMethod = registrant.stripe_setup_intent ? registrant.stripe_setup_intent.payment_method : null
    const payment = registrant.stripe_setup_intent ? 'Add a Card' : 'Pay'
    const paymentLink = `/event/${event.pk}/pay/${registrant.pk}`
    const stripeSetupIntent = registrant.stripe_setup_intent ?
      'Add a card to complete your registration.' :
      'Pay now to complete your registration.'

    if (isFetching) {
      return <div className="text-center">
        <Spinner animation="border" />
      </div>
    }

    return <div className="events-root">
      <Nav />
      <Container className="mt-5">
        <div>
          <h1>{registrant.name}</h1>
          {registrant.paid == false && !registrant.stripe_subscription_schedule &&
            <Alert variant="danger" className="mt-2" dismissible>
              <Alert.Heading>Your registration is incomplete.</Alert.Heading>
              <p>Your spot is not reserved until you pay. {stripeSetupIntent}</p>
              <LinkContainer to={paymentLink}>
                <Button variant="light">{payment}</Button>
              </LinkContainer>
            </Alert>}
            {registrant.paid == false && registrant.stripe_subscription_schedule &&
            <Alert variant="danger" className="mt-2" dismissible>
              <Alert.Heading>Your registration is processing.</Alert.Heading>
              <p>Your card will be charged within an hour.</p>
            </Alert>}
          <Tabs id="uncontrolled-tab-example" className="mt-5">
            <Tab className="p-3" eventKey="registration_information" title="Registration Information">
              <Form
                submission={{data: registrant.registration_information}}
                options={{readOnly: true}} form={event.registration_form} />
            </Tab>
            {additionalForms.length > 0 && <Tab className="p-3" eventKey="additional_forms" title="Additional Forms">
              <ListGroup>
                {additionalForms.map((form, index) =>
                  <LinkContainer to={`/event/${registrant.event}/registrant/${registrant.pk}/additional-form/${form.form_id}`}>
                    <ListGroup.Item action href="#" key={index}>
                      {form.form_data.name}
                      {form.response == null &&
                            <Badge className="ml-2 float-right" variant="info">Not submitted</Badge>}
                    </ListGroup.Item>
                  </LinkContainer>
                )}
              </ListGroup>
            </Tab>}
            <Tab className="p-3" eventKey="billing" title="Billing">
              <p>
                <b>Payment plan: </b>
                {selectedPlan ? selectedPlan.name : 'None'}
              </p>
              {registrant.stripe_setup_intent && registrant.paid &&
                <Row className="p-2" noGutters>
                  <Col md="auto" className="mr-2">
                    <img style={{height:48}} src={`/card-images/${paymentMethod.card.brand}.png`} />
                  </Col>
                  <Col>
                    •••• {paymentMethod.card.last4}
                    <br />
                    <small className="text-muted">
                      Expires {paymentMethod.card.exp_month.toString().padStart(2, '0')}/{paymentMethod.card.exp_year}
                    </small>
                  </Col>
                </Row>}
            </Tab>
          </Tabs>
        </div>
      </Container>
    </div>
  }
}

export default enchanceRegistrant(Registrant)
