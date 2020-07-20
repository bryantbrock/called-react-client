import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Nav} from 'components'
import {Button, Card, Col, Container, Row, Spinner} from 'react-bootstrap'
import {Form} from 'react-formio';
import {fetchEvent} from 'app/event/actions.js'
import {createRegistrant} from '../actions.js'
import {store} from 'store.js'

const enchanceEventRegistration = connect(
  (state, ownProps) => ({
    event: state.events.items.find(event => event.pk == ownProps.match.params.event_id),
    auth: state.auth,
    isFetching: state.events.isFetching,
    newest: state.registrants.newest,
  }), {})

export class EventRegistration extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.register = this.register.bind(this);
    this.registerWithPlan = this.registerWithPlan.bind(this);
    this.state = {
      registrant: {}
    }
  }

  componentDidMount() {
    const {event, auth} = this.props;
    const {event_id} = this.props.match.params
    store.dispatch(fetchEvent(event_id, auth.user.token))
  }

  render() {
    const {event} = this.props;
    return <div className="events-root">
      <Nav />
      <Container className="mt-5">
        {this.props.isFetching ? <div className="text-center"><Spinner animation="border" /></div> : <div>
          <h1>Register for {event.name}</h1>
          <Form form={event.registration_form} onSubmit={this.submitForm} />
          <h2>How would you like to pay?</h2>
          <Row>
            <Col sm={12} md={6} lg={4} className="mt-4">
              <Card className="p-5 text-center">
                <h1 className="mb-0">{event.price}</h1>
                <p className="text-capitalize text-muted"><small>One Time</small></p>
                <Button variant="primary" size="lg" onClick={this.register}>Select</Button>
              </Card>
            </Col>
            {event.payment_plans.map((plan, index) => {
              return <Col sm={12} md={6} lg={4} className="mt-4" key={index}>
                <Card className="p-5 text-center">
                  <h1 className="mb-0">{plan.price.toFixed(2)}</h1>
                  <p className="text-capitalize text-muted"><small>{plan.payment_interval_str} | {plan.iterations} payments</small></p>
                  <Button variant="secondary" size="lg" onClick={() => this.registerWithPlan(plan.pk)}>Select</Button>
                </Card>
              </Col>
            })}
          </Row>
        </div>}
      </Container>
    </div>
  }

  submitForm(submission) {
    const {event_id} = this.props.match.params
    this.setState({
      registrant: {
        registration_information: submission.data,
        event: event_id,
      }
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.newest !== this.props.newest) {this.props.history.push(`/event/${this.props.match.params.event_id}/pay/${this.props.newest}`)}
  }

  register() {
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

export default enchanceEventRegistration(EventRegistration)
