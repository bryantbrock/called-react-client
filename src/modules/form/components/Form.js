import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropType from 'prop-types'
import {Input} from 'components'
import {clearErrors} from 'app/errors/state'
import {selectSubmissionStatus} from 'modules/form/selectors'
import {toObj} from 'utils/misc'
import 'resources/css/main.css'

const formEnhancer = connect(
  state => ({
    failedFields: selectSubmissionStatus(state),
  }),
  {
    clearErrors,
  }
)

class Form extends Component {
  state = toObj(this.props.fields, 'name')

  componentDidMount() {
    // Remove any field errors hanging around
    this.props.clearErrors()
  }
  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }
  onSubmit(e) {
    e.preventDefault()
    this.props.onSubmit(this.state)
  }
  renderFields(fields) {

    return (
      <div>
        {fields.map(({label, name, type}) => {
          const failed = Boolean(this.props.failedFields[name])
          const message = this.props.failedFields.message 
            || 'Invalid ' + name

          return (
            <React.Fragment key={name}>
              <Input 
                type={type}
                label={label}
                name={name}
                value={this.state[name]}
                onChange={e => this.onChange(e)}
                failed={failed} />
              {failed && 
                <div className="form-field-fail">{message}</div>}
            </React.Fragment>
          )
        })}
      </div>
    )
  }
  render() {
    const {fields, children} = this.props

    return (
      <form
        onSubmit={e => this.onSubmit(e)}
        className="form">

        {this.renderFields(fields)}
        {children}

      </form>
    )
  }
}

Form.propTypes = {
  fields: PropType.array,
  onSubmit: PropType.func.isRequired,
  failedFields: PropType.object,
  clearErrors: PropType.func,
}

export default formEnhancer(Form)