import {combineReducers} from 'redux'
import reduceReducers from 'reduce-reducers';
import {Auth} from 'app/auth'
import eventsReducer from 'app/events/reducers.js'
import registrantReducer from 'app/eventregistration/reducers.js'
import paymentMethodsReducer from 'app/account/reducers.js'
import {eventReducer, registrantsReducer} from 'app/event/reducers.js'

export default combineReducers({
  auth: Auth.reducer,
  events: reduceReducers(eventsReducer, eventReducer),
  registrants: reduceReducers(registrantReducer, registrantsReducer),
  paymentMethods: paymentMethodsReducer,
})