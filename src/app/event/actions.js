import {getEvent, getRegistrants} from 'app/requests'

export const REQUEST_EVENT = 'REQUEST_EVENT'

function requestEvent(id) {
  return {
    type: REQUEST_EVENT,
    id: id,
  }
}

export const RECEIVE_EVENT = 'RECEIVE_EVENT'

function receiveEvent(id, json) {
  return {
    type: RECEIVE_EVENT,
    event: json,
    id: id,
    receivedAt: Date.now()
  }
}


export function fetchEvent(id, token) {

  return function (dispatch) {

    dispatch(requestEvent(id, token))

    return getEvent({}, {}, id, token)
      .then(
        response => response.data
      )
      .then(json =>
        dispatch(receiveEvent(id, json))
      )
  }
}

export function backgroundFetchEvent(id, token) {

  return function (dispatch) {
    return getEvent({}, {}, id, token)
      .then(
        response => response.data
      )
      .then(json =>
        dispatch(receiveEvent(id, json))
      )
  }
}


export const REQUEST_REGISTRANTS = 'REQUEST_REGISTRANTS'

function requestRegistrants(filter) {
  return {
    type: REQUEST_REGISTRANTS,
    filter: filter,
  }
}

export const RECEIVE_REGISTRANTS = 'RECEIVE_REGISTRANTS'

function receiveRegistrants(data) {
  return {
    type: RECEIVE_REGISTRANTS,
    registrants: data,
  }
}

export function fetchRegistrants(filter={}, token) {
  return function (dispatch) {

    dispatch(requestRegistrants(filter, token))

    return getRegistrants(filter, {}, null, token)
      .then(
        response => response.data
      )
      .then(data =>
        dispatch(receiveRegistrants(data))
      )
  }
}

export function backgroundFetchRegistrants(filter={}, token) {
  return function (dispatch) {

    return getRegistrants({}, {params: filter}, null, token)
      .then(
        response => response.data
      )
      .then(data =>
        dispatch(receiveRegistrants(data))
      )
  }
}