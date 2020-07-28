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
    const {isAuthenticated, component: Component, ...rest} = this.props

    return (

      // Show the component only when the user is logged in
      // Otherwise, redirect the user to /signin page
      <Route {...rest} render={props => (
        isAuthenticated ?
              <Component {...props} />
          : <Redirect to="/signin" />
      )} />
  );
  }
}

export default enhanceRouting(PrivateRoute)