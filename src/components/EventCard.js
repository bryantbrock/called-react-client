import React, {Component} from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import {LinkContainer} from 'react-router-bootstrap'

class EventCard extends Component {
  render() {
    const event = this.props.event;
    return <Card className={this.props.className}>
      <Card.Img variant="top" src={event.image_source} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{event.name}</Card.Title>
        <Card.Text>
          {event.short_description}
        </Card.Text>
        <LinkContainer to={`event/${event.pk}`}>
          <Button className="mt-auto" variant="primary">More</Button>
        </LinkContainer>
      </Card.Body>
    </Card>
  }
}

export default EventCard