import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {routes} from 'app/routing'
import {withRouter} from 'react-router-dom'
import {Component} from 'app/utils'
import {Auth, NotFound} from 'app/auth'
import {connect} from 'react-redux'

const enhancer = connect(
  state => ({
    isAuthenticated: state.auth.isAuthenticated,
  }),
  {
    clearErrors: Auth.actions.clearErrors
  }
)

export class Routing extends Component {
  componentDidMount() {
    this.props.clearErrors()
  }
  renderPrivateRoute(route, idx) {
    const {isAuthenticated} = this.props

    return isAuthenticated ?
      <Route
        exact={route.notExact ? false : true}
        key={idx}
        path={route.path}
        component={withRouter(route.component)}
        title={route.title} /> :
      <Redirect key={idx} to={`/signin?next=${window.location.pathname + window.location.search}`} />
  }
  render() {
    return (
      <Switch>
        {routes.map((route, idx) =>
          !route.public
            ? this.renderPrivateRoute(route, idx)
            : <Route
                exact={route.notExact ? false : true}
                key={idx}
                path={route.path}
                component={withRouter(route.component)}
                title={route.title} />
        )}
        <Route component={NotFound} />
      </Switch>
    )
  }
}

export default enhancer(Routing)
