import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

const enhanceRouting = connect(
  state => ({
    token: state.auth.token,
  }),
)

class PrivateRoute extends React.Component {
  render() {
    const {Component, token} = this.props

    return (
      <Route render={() => (
        token ? <Component /> : <Redirect to='/login' />
      )} />
    )
  }
}

export default enhanceRouting(PrivateRoute)