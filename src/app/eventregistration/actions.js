import {getRegistrant, postRegistrant} from 'app/requests'

export const CREATE_REGISTRANT = 'CREATE_REGISTRANT'

function createRegistrantAction(data) {
  return {
    type: CREATE_REGISTRANT,
    registrant: data,
  }
}

export const REQUEST_REGISTRANT = 'REQUEST_REGISTRANT'

function requestRegistrant(id) {
  return {
    type: REQUEST_REGISTRANT,
    id: id,
  }
}

export const RECEIVE_REGISTRANT = 'RECEIVE_REGISTRANT'

function receiveRegistrant(data, created=false) {
  return {
    type: RECEIVE_REGISTRANT,
    registrant: data,
    created: created,
  }
}

export function createRegistrant(data, token) {
  return function (dispatch) {

    dispatch(createRegistrantAction(data))

    return postRegistrant(data, {}, null, token)
      .then(
        response => response.data
      )
      .then(data =>
        dispatch(receiveRegistrant(data, true))
      )
  }
}

export function fetchRegistrant(data, token) {
  return function (dispatch) {

    dispatch(requestRegistrant(data))

    return getRegistrant(data, {}, null, token)
      .then(
        response => response.data
      )
      .then(data =>
        dispatch(receiveRegistrant(data))
      )
  }
}