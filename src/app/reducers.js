import {combineReducers} from 'redux'
import {Auth} from 'app/auth'
import {Errors} from 'app/errors'

export default combineReducers({
  auth: Auth.reducer,
  errors: Errors.reducer,
})