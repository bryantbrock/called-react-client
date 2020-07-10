import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import {routes, PrivateRoute} from 'app/routing'
import {Auth} from 'app/auth'
import {connect} from 'react-redux'

const enhancer = connect(
  null, 
  {
    clearErrors: Auth.actions.clearErrors
  }
)

export class Routing extends Component {
  componentDidMount() {
    this.props.clearErrors()
  }
  render() {
    return (
      <Switch>
        {routes.map((route, idx) => 
          route.private
          ? <PrivateRoute key={idx} path={route.path}>
            <route.component />
          </PrivateRoute>
          : <Route key={idx} path={route.path}>
            <route.component />
          </Route>)}
      </Switch>
    )
  }
}

export default enhancer(Routing)
