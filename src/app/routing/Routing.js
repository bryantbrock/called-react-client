import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {routes, PrivateRoute} from 'app/routing'
import {withRouter} from 'react-router-dom'
import {Component} from 'app/utils'
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
            ? <PrivateRoute key={idx} path={route.path} component={withRouter(route.component)} title={route.title} />
            : <Route key={idx} path={route.path} component={withRouter(route.component)} title={route.title} />
        )}
      </Switch>
    )
  }
}

export default enhancer(Routing)
