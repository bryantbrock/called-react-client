import {combineReducers} from 'redux'
import {Auth} from 'app/auth'

export default combineReducers({
  auth: Auth.reducer,
})