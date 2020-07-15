import {getEvents} from 'app/requests'

export const REQUEST_EVENTS = 'REQUEST_EVENTS'

function requestEvents(filter=null) {
  return {
    type: REQUEST_EVENTS,
    filter: filter,
  }
}

export const RECEIVE_EVENTS = 'RECEIVE_EVENTS'

function receiveEvents(filter, json) {
  return {
    type: RECEIVE_EVENTS,
    filter: filter,
    events: json,
    receivedAt: Date.now()
  }
}


export function fetchEvents(filter=null) {

  return function (dispatch) {

    dispatch(requestEvents(filter))

    return getEvents()
      .then(
        response => response.data
      )
      .then(json =>
        dispatch(receiveEvents(filter, json))
      )
  }
}

export function backgroundFetchEvents(filter=null) {

  return function (dispatch) {

    return getEvents()
      .then(
        response => response.data
      )
      .then(json =>
        dispatch(receiveEvents(filter, json))
      )
  }
}