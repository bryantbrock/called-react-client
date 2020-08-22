import React, { Component } from 'react'
import {Container} from 'react-bootstrap'
import {Nav} from 'components'

export class NotFound extends Component {
  render() {
    console.log('222')
    return <div>
      <Nav />
      <Container>
        <div class="w-auto border border-primary rounded" style={{padding: '10rem', marginTop: '3rem'}}>
          <h1 class="text-center">Page Not Found</h1>
          <p class="text-center">We couldn't find the page you are looking for.</p>
        </div>
      </Container>
    </div>
  }
}

export default NotFound
