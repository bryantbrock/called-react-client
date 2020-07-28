import {
  REQUEST_EVENTS,
  RECEIVE_EVENTS,
} from './actions.js'

function eventsReducer(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case REQUEST_EVENTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      }
    case RECEIVE_EVENTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.events,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

export default eventsReducer