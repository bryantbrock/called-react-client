import {
  CREATE_REGISTRANT,
  RECEIVE_REGISTRANT,
} from './actions.js'

export function registrantReducer(
  state = {
    isFetching: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case CREATE_REGISTRANT:
      return {
        ...state,
        isFetching: true,
      }
    case RECEIVE_REGISTRANT:
      return {
        ...state,
        isFetching: false,
        // update the item if it exists, otherwise, add it
        // this might not be necessary, but I thought up a scenario where someone could have a newly created registrant in the store, don't remember what it was lol
        items: state.items.some(item => item.pk == action.registrant.pk) ? state.items.map((item, index) => {
          return item.pk == action.registrant.pk ? action.registrant : item
        }) : [...state.items, action.registrant],
      }
    default:
      return state
  }
}

export default registrantReducer