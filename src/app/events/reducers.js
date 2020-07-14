import {
  INVALIDATE_EVENTS,
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
    case INVALIDATE_EVENTS:
      return {
        ...state,
        didInvalidate: true,
      }
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