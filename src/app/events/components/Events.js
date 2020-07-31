import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Nav} from 'components'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import EventCard from 'components/EventCard.js'
import {backgroundFetchEvents, fetchEvents} from '../actions.js'
import {store} from 'store.js'

const enchanceEvents = connect(
  state => ({
    events: state.events.items,
  }), {})

export class Events extends Component {
  componentDidMount() {
    const {events} = this.props
    if (events == null) {
      store.dispatch(fetchEvents())
    } else {
      // update events in background
      store.dispatch(backgroundFetchEvents())
    }
  }
  render() {
    const {events} = this.props

    return (
      <div className="events-root">
        <Nav />
        <div className="container">
          <h1 className="mt-4">Events</h1>
          <Row>
          {events.map((event, index) => {
            return <Col sm={12} md={6} lg={4} className="mt-4" key={index}><EventCard className="h-100" event={event} /></Col>
          })}
          </Row>
        </div>
      </div>
    )
  }
}

export default enchanceEvents(Events)
