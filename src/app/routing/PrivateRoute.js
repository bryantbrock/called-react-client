import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

const enhanceRouting = connect(
  state => ({
    isAuthenticated: state.auth.isAuthenticated,
  }),
)

class PrivateRoute extends React.Component {
  render() {
    const {isAuthenticated, children} = this.props

    return <Route
      render={({ location }) =>
        isAuthenticated ?
          children : <Redirect to={{
              pathname: "/signin",
              state: {from: location}
            }}/>} />
  }
}

export default enhanceRouting(PrivateRoute)