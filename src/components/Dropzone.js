import React, {Component} from 'react'
import ReactDOM from 'react-dom'
// import {Icon} from 'components'

// Utils
function getDataTransferItems(event) {
  let dataTransferItemsList = []
  if (event.dataTransfer) {
    const dt = event.dataTransfer
    if (dt.files && dt.files.length) {
      dataTransferItemsList = dt.files
    } else if (dt.items && dt.items.length) {
      // During the drag event the dataTransfer.files is null
      // but Chrome implements some drag store, which is accesible via dataTransfer.items
      dataTransferItemsList = dt.items
    }
  } else if (event.target && event.target.files) {
    dataTransferItemsList = event.target.files
  }

  // Convert from DataTransferItemsList to the native Array
  return Array.prototype.slice.call(dataTransferItemsList).filter(identity)
}


class Dropzone extends Component {
  openSystemDialog() {
    ReactDOM.findDOMNode(this).querySelector('input').click()
  }
  async onDrop(evt) {
    evt.preventDefault()

    const files = await Promise.all(getDataTransferItems(evt))
    const value = files.map(file => ({
        file: file,
        name: file.name
      }))

    this.props.onChange(value)
  }
  render() {
    const accept = ".pdf, .docx"

    return <span>
      {/* <Icon
        icon="paperclip"
        className="m-2 cursor-pointer"
        onClick={() => this.openSystemDialog()} /> */}
      <input
        type="file"
        accept={accept}
        multiple={true}
        style={{display: 'none'}}
        onChange={e => this.onDrop(e)}
        autoComplete="off" />
    </span>
  }
}

export default Dropzone
