import React, {Component} from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

class EventCard extends Component {
  render() {
    const event = this.props.event;
    return <Card className={this.props.className}>
    <Card.Img variant="top" src={event.image_source} />
    <Card.Body>
      <Card.Title>{event.name}</Card.Title>
      <Card.Text>
      {event.short_description}
      </Card.Text>
      <Button variant="primary">More</Button>
    </Card.Body>
  </Card>
  }
}

export default EventCard