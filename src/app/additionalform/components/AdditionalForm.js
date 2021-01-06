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
import {fetchAdditionalForms, postAdditionalForm} from 'app/registrant/actions.js'

const enchanceRegistrant = connect(
  (state, ownProps) => ({
    additionalForm: state.additionalForms.items.find(form => form.form_id === parseInt(ownProps.match.params.additional_form_id) && form.id === parseInt(ownProps.match.params.registrant_id)),
    event: state.events.items.find(event => event.pk == ownProps.match.params.event_id),
    registrant: state.registrants.items.find(registrant => registrant.pk == ownProps.match.params.registrant_id),
    auth: state.auth,
    isFetching: state.events.isFetching || state.registrants.isFetching || state.additionalForms.isFetching,
  }), {})

export class Registrant extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount() {
    const {auth, registrant} = this.props
    store.dispatch(fetchAdditionalForms(registrant.pk, auth.user.token))
  }

  submitForm(submission) {
    const {auth, registrant, additionalForm} = this.props

    this.setState({submitting: true})

    store.dispatch(postAdditionalForm({
      id: registrant.pk,
      form_id: additionalForm.form_id,
      response: submission.data,
    }, auth.user.token))

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
    const {additionalForm, event, registrant, isFetching} = this.props

    if (isFetching) {
      return <div className="text-center">
        <Spinner animation="border" />
      </div>
    }

    return <div className="additional-form-root">
      <Nav />
      <Container className="mt-5">
        <div>
          <h1>{additionalForm.form_data.name} for {registrant.name}</h1>
          <Form
            submission={{data: additionalForm.response}}
            // options={{readOnly: additionalForm.response != null}}
            form={additionalForm.form_data.form}
            onSubmit={this.submitForm}
            onError={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          />
        </div>
      </Container>
    </div>
  }
}

export default enchanceRegistrant(Registrant)
