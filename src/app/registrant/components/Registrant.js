import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Nav} from 'components'
import {Button, Card, Col, Container, Row, Spinner} from 'react-bootstrap'
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
  componentDidMount() {
    // const {event, auth} = this.props;
    // const {event_id} = this.props.match.params
    // store.dispatch(fetchEvent(event_id, auth.user.token))
  }

  render() {
    const {event, registrant} = this.props;
    return <div className="events-root">
      <Nav />
      <Container className="mt-5">
        {this.props.isFetching ? <div className="text-center"><Spinner animation="border" /></div> : <div>
          <h1>{registrant.name}</h1>
          <hr />
          {registrant.payment_status == 0 && <div className="mb-5">
            <p>Add a card to complete your registration.</p>
            <LinkContainer to={`/event/${event.pk}/pay/${registrant.pk}`}><Button variant="primary">Add a Card</Button></LinkContainer>
          </div>}
          <div>
            <Form submission={{data: registrant.registration_information}} options={{readOnly: true}} form={event.registration_form} />
          </div>
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
