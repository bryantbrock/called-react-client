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
        // except, don't remove the registrant if it is the newest one, since this may exist only on the frontend, and not on the backend for a little while
        // had to reintroduce this bug, because I think it is actually caused by network delay for the larger request. The earlier fix though would make duplicate copies of the registrant, and not delete the newest registrant if it is actually deleted on the backend
        items: action.filter.event ? [...state.items.filter(item => item.event != action.filter.event), ...action.registrants] : action.registrants
      }
    default:
      return state
  }
}