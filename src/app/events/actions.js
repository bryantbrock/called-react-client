export const INVALIDATE_EVENTS = 'INVALIDATE_EVENTS'

function invalidateEvents() {
  return {
    type: INVALIDATE_EVENTS,
  }
}

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

    return fetch(`https://called-backend.herokuapp.com/called-backend/events/`)
      .then(
        response => response.json()
      )
      .then(json =>
        dispatch(receiveEvents(filter, json))
      )
  }
}

export function backgroundFetchEvents(filter=null) {

  return function (dispatch) {

    return fetch(`https://called-backend.herokuapp.com/called-backend/events/`)
      .then(
        response => response.json()
      )
      .then(json =>
        dispatch(receiveEvents(filter, json))
      )
  }
}