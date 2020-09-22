import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Nav} from 'components'
import {Badge, Col, ListGroup, Row, Spinner, ListGroupItem} from 'react-bootstrap'
import EventCard from 'components/EventCard.js'
import {backgroundFetchEvents, fetchEvents} from 'app/events/actions.js'
import {backgroundFetchRegistrants, fetchRegistrants} from 'app/event/actions.js'
import {store} from 'store.js'
import {LinkContainer} from 'react-router-bootstrap'

const enchanceDashboard = connect(
  state => ({
    events: state.events.items.map(item => item),
    auth: state.auth,
    registrants: state.registrants,
  }), {})

export class Dashboard extends Component {

  componentDidMount() {
    const {events, auth, registrants} = this.props;
    registrants.items.length == 0 ? store.dispatch(fetchRegistrants({}, auth.user.token)) : store.dispatch(backgroundFetchRegistrants({}, auth.user.token))
    if (events == null) {
      store.dispatch(fetchEvents())
    } else {
      // update events in background
      store.dispatch(backgroundFetchEvents())
    }
  }

  render() {
    const {events, registrants} = this.props;

    return (
      <div className="events-root">
        <Nav />
        <div className="container">
          <h1 className="mt-4">Featured Events</h1>
          <Row>
            <Col sm={12} md={6}>
              <Row>
                {events.filter(event => event.featured == true).map((event, index) =>
                  <Col sm={12} className="mt-4" key={index}>
                    <EventCard className="h-100" event={event} />
                  </Col>)}
              </Row>
            </Col>
            <Col sm={12} md={6}>
              {registrants.isFetching ?
                <div className="text-center">
                  <Spinner animation="border" className="my-5" />
                </div> :
                <ListGroup className="mt-4 mb-5">
                  {registrants.items.length > 0 ? registrants.items.map((registrant, index) =>
                    <LinkContainer to={`/event/${registrant.event}/registrant/${registrant.pk}`}>
                      <ListGroup.Item action href="#" key={index}>
                        {registrant.name}
                        {registrant.payment_status == 0 &&
                          <Badge className="ml-2 float-right" variant="info">Registration incomplete</Badge>}
                      </ListGroup.Item>
                    </LinkContainer>) :
                    <LinkContainer to="/events">
                      <ListGroupItem>
                        <div className="text-center">You are not registered for any upcoming events.</div>
                      </ListGroupItem>
                    </LinkContainer>}
                </ListGroup>}
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default enchanceDashboard(Dashboard)
