import React, {Component} from 'react'
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import BSNav from 'react-bootstrap/Nav'
import {Auth} from 'app/auth/state'
import {connect} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'

const enchanceNav = connect(
  null,
  {
    logoutUser: Auth.actions.logout,
  }
)

export class Nav extends Component {
  logout() {
    this.props.logoutUser()
  }

  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#">NSA Event Registration</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <BSNav className="mr-auto">
            <LinkContainer to="/dashboard">
              <BSNav.Link>Dashboard</BSNav.Link>
            </LinkContainer>
            <LinkContainer to="/events">
              <BSNav.Link>Events</BSNav.Link>
            </LinkContainer>
          </BSNav>
          <Button onClick={() => this.logout()}>Logout</Button>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default enchanceNav(Nav)