import React, {Component} from 'react'

class Card extends Component {
  render() {
    return <div className={"shadow p-5 bg-white rounded text-center w-100 " + this.props.className}>
      {this.props.children}
    </div>
  }
}

export default Card