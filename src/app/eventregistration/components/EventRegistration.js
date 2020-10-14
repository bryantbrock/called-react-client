import React, {Component, useState} from 'react'
import {connect} from 'react-redux'
import {Nav} from 'components'
import {Button, Card, Col, Container, Row, Spinner} from 'react-bootstrap'
import {Form} from 'react-formio';
import {fetchEvent} from 'app/event/actions.js'
import {createRegistrant} from '../actions.js'
import {store} from 'store.js'
import Toast from 'components/Toast.js'
import {validateDiscountCode} from 'app/requests'

const enchanceEventRegistration = connect(
  (state, ownProps) => ({
    event: state.events.items.find(event => event.pk == ownProps.match.params.event_id),
    auth: state.auth,
    isFetching: state.events.isFetching,
    newest: state.registrants.newest,
    submittedRegistrationInfo: false,
  }), {})

export class EventRegistration extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.register = this.register.bind(this);
    this.checkDiscountCode = this.checkDiscountCode.bind(this);
    this.registerWithPlan = this.registerWithPlan.bind(this);
    this.registerWithCheck = this.registerWithCheck.bind(this);
    this.state = {
      registrant: {},
      submitting: false,
      discountCode: {},
      invalidCode: false,
    }
  }

  componentDidMount() {
    const {event, auth} = this.props;
    const {event_id} = this.props.match.params
    store.dispatch(fetchEvent(event_id, auth.user.token))
    const discount_code = new URLSearchParams(this.props.location.search).get('discount_code')
    if (discount_code) {
      this.checkDiscountCode(discount_code)
    }
  }

  render() {
    const {event} = this.props;
    return <div className="events-root">
      <Nav />
      <Container className="mt-5">
        {this.props.isFetching || this.state.submitting ? <div className="text-center"><Spinner animation="border" /></div> : <div>
          {this.state.discountCode.code && <Toast header="Discount Code" message={`Discount code ${this.state.discountCode.code} applied!`} />}
          {this.state.invalidCode && <Toast header="Discount Code" message="Your discount code is invalid. It has not been applied." />}
          <h1>Register for {event.name}</h1>
          <div hidden={this.state.submittedRegistrationInfo}>
            <Form form={event.registration_form} onSubmit={this.submitForm} onError={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
          </div>
          <div hidden={!this.state.submittedRegistrationInfo}>
            <h2>How would you like to pay?</h2>
            <Row>
              <Col sm={12} md={6} lg={4} className="mt-4">
                <Card className="p-5 text-center">
                  <h1 className="mb-0">{this.state.discountCode.code ? <span><s className="text-muted">${event.price}</s> ${(event.price * (1 - this.state.discountCode.amount/100)).toFixed(2)}</span> : event.price}</h1>
                  <p className="text-capitalize text-muted"><small>One Time</small></p>
                  <Button disabled={this.state.submitting} variant="primary" size="lg" onClick={this.register}>Select</Button>
                </Card>
              </Col>
              <Col sm={12} md={6} lg={4} className="mt-4">
                <Card className="p-5 text-center">
                  <h1 className="mb-0">{this.state.discountCode.code ? <span><s className="text-muted">${event.price}</s> ${(event.price * (1 - this.state.discountCode.amount/100)).toFixed(2)}</span> : event.price}</h1>
                  <p className="text-capitalize text-muted"><small>Bring/Mail in a Check</small></p>
                  <Button disabled={this.state.submitting} variant="primary" size="lg" onClick={this.registerWithCheck}>Select</Button>
                </Card>
              </Col>
              {event.payment_plans.map((plan, index) => {
                return <Col sm={12} md={6} lg={4} className="mt-4" key={index}>
                  <Card className="p-5 text-center">
                    <h1 className="mb-0">{this.state.discountCode.code ? <span><s className="text-muted">${plan.price.toFixed(2)}</s> ${(plan.price * (1 - this.state.discountCode.amount/100)).toFixed(2)}</span> : plan.price.toFixed(2)}</h1>
                    <p className="text-capitalize text-muted"><small>{plan.payment_interval_str} | {plan.iterations} payments</small></p>
                    <Button disabled={this.state.submitting} variant="secondary" size="lg" onClick={() => this.registerWithPlan(plan.pk)}>Select</Button>
                  </Card>
                </Col>
              })}
            </Row>
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

  componentDidUpdate(prevProps) {
    if (prevProps.newest !== this.props.newest) {this.props.history.push(`/event/${this.props.match.params.event_id}/pay/${this.props.newest}`)}
  }

  register() {
    this.setState({
      submitting: true,
    })
    if (this.state.discountCode.code) {
      this.setState({
        registrant: {
          ...this.state.registrant,
          set_discount_code: this.state.discountCode.code
        }
      }, () => store.dispatch(createRegistrant(this.state.registrant, this.props.auth.user.token)))
    } else {
      store.dispatch(createRegistrant(this.state.registrant, this.props.auth.user.token))
    }
  }

  registerWithPlan(plan) {
    this.setState(prevState => ({
      registrant: {
        ...prevState.registrant,
        payment_plan: plan,
      }
    }), this.register)
  }

  registerWithCheck() {
    this.setState(prevState => ({
      registrant: {
        ...prevState.registrant,
        paying_by_check: true,
      }
    }), this.register)
  }

  checkDiscountCode(discountCode) {
    validateDiscountCode({
      code: discountCode,
      event: this.props.match.params.event_id,
    }, {}, null, this.props.auth.user.token)
      .then(
        response => {
          if (response.data.valid) {
            this.setState({
              discountCode: {
                ...response.data.discount_code,
                code: discountCode,
              }
            })
          } else {
            this.setState({
              invalidCode: true,
            })
          }
        }
      )
  }
}

export default enchanceEventRegistration(EventRegistration)
