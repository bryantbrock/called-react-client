import React, {Component} from 'react'
import 'resources/css/main.css'

export class Loader extends Component {
  render() {
    const {visible} = this.props

    return <div style={{height: '100%'}}>
      {visible && 
        <div 
          className="full-loader" />
      }
    </div>
  }
}
 
export default Loader
