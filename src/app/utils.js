import {PureComponent} from "react"
import autoBind from 'react-autobind'

export const getToken = getState => {
  // Get Token from local storage
  const token = getState().auth.token

  // Headers
  const config = {
    headers: {
      "content-type": "application/json"
    }
  }

  // If token, add to headers
  if(token) {
    config.headers['x-auth-token'] = token
  }

  return config
}

// Component
export class Component extends PureComponent {
  constructor(props) {
    super(props)

    autoBind(this)
  }
  // componentWillMount() {
  //   document.title = this.props.title;
  // }
}