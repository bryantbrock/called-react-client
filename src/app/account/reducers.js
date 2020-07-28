import {
  REQUEST_PAYMENT_METHODS,
  RECEIVE_PAYMENT_METHODS,
} from './actions.js'

export default function paymentMethodsReducer(
  state = {
    isFetching: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case REQUEST_PAYMENT_METHODS:
      return {
        ...state,
        isFetching: true,
      }
    case RECEIVE_PAYMENT_METHODS:
      return {
        ...state,
        isFetching: false,
        items: action.paymentMethods.data,
      }
    default:
      return state
  }
}