import {postRegistrant} from 'app/requests'

export const CREATE_REGISTRANT = 'REQUEST_REGISTRANT'

function createRegistrantAction(data) {
  return {
    type: CREATE_REGISTRANT,
    registrant: data,
  }
}

export const RECEIVE_REGISTRANT = 'RECEIVE_REGISTRANT'

function receiveRegistrant(data) {
  return {
    type: RECEIVE_REGISTRANT,
    registrant: data,
  }
}

export function createRegistrant(data, token) {
  console.log(data)
  return function (dispatch) {

    dispatch(createRegistrantAction(data))

    return postRegistrant(data, {}, null, token)
      .then(
        response => response.data
      )
      .then(data =>
        dispatch(receiveRegistrant(data))
      )
  }
}