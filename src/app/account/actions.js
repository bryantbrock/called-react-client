import {getPaymentMethods} from 'app/requests'

export const REQUEST_PAYMENT_METHODS = 'REQUEST_PAYMENT_METHODS'

function requestPaymentMethods() {
  return {
    type: REQUEST_PAYMENT_METHODS,
  }
}

export const RECEIVE_PAYMENT_METHODS = 'RECEIVE_PAYMENT_METHODS'

function receivePaymentMethods(json) {
  return {
    type: RECEIVE_PAYMENT_METHODS,
    paymentMethods: json,
  }
}


export function fetchPaymentMethods(token) {

  return function (dispatch) {

    dispatch(requestPaymentMethods())

    return getPaymentMethods({}, {}, null, token)
      .then(
        response => response.data
      )
      .then(json =>
        dispatch(receivePaymentMethods(json))
      )
  }
}

export function backgroundFetchPaymentMethods(token) {

  return function (dispatch) {
    return getPaymentMethods({}, {}, null, token)
      .then(
        response => response.data
      )
      .then(json =>
        dispatch(receivePaymentMethods(json))
      )
  }
}