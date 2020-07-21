import {
  REQUEST_EVENT,
  RECEIVE_EVENT,
  REQUEST_REGISTRANTS,
  RECEIVE_REGISTRANTS,
} from './actions.js'

export function eventReducer(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case REQUEST_EVENT:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      }
    case RECEIVE_EVENT:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        // update the item if it exists, otherwise, add it
        items: state.items.some(item => item.pk == action.id) ? state.items.map((item, index) => {
          return item.pk == action.id ? action.event : item
        }) : [...state.items, action.event],
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

export function registrantsReducer(
  state = {
    isFetching: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case REQUEST_REGISTRANTS:
      return {
        ...state,
        isFetching: true,
      }
    case RECEIVE_REGISTRANTS:
      return {
        ...state,
        isFetching: false,
        // if the results had a filter, remove only the registrants that the filter would have gotten
        // otherwise remove all the registrants, this is so that deleted registrants are removed from the frontend
        items: action.filter.event ? [...state.items.filter(item => item.event != action.filter.event), ...action.registrants] : action.registrants
      }
    default:
      return state
  }
}