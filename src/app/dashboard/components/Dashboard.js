import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Nav, Display} from 'components'
import {logoutUser} from 'app/auth/state'
import 'resources/css/pages.css'

const enchanceDashboard = connect(
  null,
  {
    logoutUser,
  }
)

export class Dashboard extends Component {
  logout() {
    this.props.logoutUser()
  }
  render() {

    return (
      <div className="dashboard-root">
        <Nav />
        <Display /> 
        <span>
          Inflation Monitor Dashboard<br></br><br></br>
          This will show current Reported Inflation,<br></br>
          Masked inflation (based on falling prices due to <br></br>
          corperate productivity, exporting labor, and <br></br>
          other ways to lower prices), and asset inflation <br></br>
          (if I can get ahold of any data on that). Finally that will<br></br>
          give you an accurate picture of inflation and possible bubbles.
        </span>
        <Button
          className="outlined w-200"
          onClick={() => this.logout()}>Logout</Button>
      </div>
    )
  }
}

export default enchanceDashboard(Dashboard)
