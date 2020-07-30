import React, {Component} from 'react'
import {Navbar, NavDropdown} from 'react-bootstrap'
import BSNav from 'react-bootstrap/Nav'
import {Auth} from 'app/auth/state'
import {connect} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'

const enchanceNav = connect(
  state => ({
    auth: state.auth,
  }),
  {
    logoutUser: Auth.actions.logout,
  }
)

export class Nav extends Component {
  logout() {
    this.props.logoutUser()
  }
  render() {
    const {auth} = this.props
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
          <NavDropdown title={auth.user.email} id="basic-nav-dropdown">
            <LinkContainer to="/account">
              <NavDropdown.Item href="#">Account</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#" onClick={() => this.logout()}>Log Out</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default enchanceNav(Nav)