import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {routes, urls} from 'app/routing'
import {withRouter} from 'react-router-dom'
import {Component} from 'app/utils'
import {Auth} from 'app/auth'
import {connect} from 'react-redux'
import history from 'app/history'

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
    if (!urls.includes(window.location.pathname)) {
      history.push('/404')
    }

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
      <Redirect key={idx} to="/signin" />
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
      </Switch>
    )
  }
}

export default enhancer(Routing)
