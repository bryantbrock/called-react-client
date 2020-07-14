import {combineReducers} from 'redux'
import {Auth} from 'app/auth'
import eventsReducer from 'app/events/reducers.js'

export default combineReducers({
  auth: Auth.reducer,
  events: eventsReducer,
})