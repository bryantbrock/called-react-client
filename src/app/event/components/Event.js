import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Nav} from 'components'
import {backgroundFetchEvent, fetchEvent, backgroundFetchRegistrants, fetchRegistrants} from '../actions.js'
import {store} from 'store.js'
import {Button, Col, ProgressBar, Row, Spinner} from 'react-bootstrap'

const enchanceEvent = connect(
  (state, ownProps) => ({
    event: state.events.items.find(event => event.pk == ownProps.match.params.event_id),
    auth: state.auth,
    registrants: state.registrants,
  }), {})

export class Event extends Component {

  componentDidMount() {
    const {event, auth, registrants} = this.props;
    const {event_id} = this.props.match.params
    event == null ? store.dispatch(fetchEvent(event_id, auth.user.token)) : store.dispatch(backgroundFetchEvent(event_id, auth.user.token))
    registrants == null ? store.dispatch({event: event_id}, fetchRegistrants(auth.user.token)) : store.dispatch(backgroundFetchRegistrants({event: event_id}, auth.user.token))
  }

  render() {
    const {event, registrants} = this.props;
    return event ? (
      <div className="events-root">
        <Nav />
        <Row>
          <Col xs={12} md={6} className="bg-dark p-5 text-white">
            <div className="container text-center">
              <h1 className="mt-4 display-1">{event ? event.name : ''}</h1>
              {event.current_registration < event.max_registration ? <Button size="lg" className="mt-4">Register Now</Button> : ''}
            </div>
          </Col>
          <Col xs={12} md={6} style={{backgroundImage: `url(${event.image_source})`}}>
          </Col>
        </Row>
        <div className="container mt-5">
          <h1>About</h1>
          <p>{event.description}</p>
          <ProgressBar now={event.current_registration} max={event.max_registration} />
          <p className="text-muted"><small>Registration: {event.current_registration} / {event.max_registration}</small></p>
          <ul>
            {registrants.items.map((registrant, index) => <li key={index}>{registrant.name}</li>)}
          </ul>
        </div>
      </div>
    ) : <Spinner />
  }
}

export default enchanceEvent(Event)
