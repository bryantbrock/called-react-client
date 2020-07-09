import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import BSNav from 'react-bootstrap/Nav'

export class Nav extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#">NSA Event Registration</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <BSNav className="mr-auto">
          <BSNav.Link href="/dashboard">Dashboard</BSNav.Link>
          <BSNav.Link href="/events">Events</BSNav.Link>
        </BSNav>
        <Button onClick={() => this.logout()}>Logout</Button>
      </Navbar.Collapse>
    </Navbar>
    )
  }
}

export default Nav
