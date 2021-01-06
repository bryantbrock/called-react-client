import {
  REQUEST_ADDITIONAL_FORMS,
  RECEIVE_ADDITIONAL_FORMS,
  RECEIVE_ADDITIONAL_FORM,
  POST_ADDITIONAL_FORM,
} from './actions.js'

function additionalFormsReducer(
  state = {
    isFetching: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case POST_ADDITIONAL_FORM:
      return {
        ...state,
        isFetching: true,
      }
    case REQUEST_ADDITIONAL_FORMS:
      return {
        ...state,
        isFetching: true,
      }
    case RECEIVE_ADDITIONAL_FORMS:
      return {
        ...state,
        isFetching: false,
        items: [
          //replace all the forms with the id of the registrant whose forms were just fetched, keep all the others
          ...action.additionalForms.map(
            (item) => ({
              ...item,
              id: action.id,
            })
          ),
          ...state.items.filter(item => item.id != action.id),
        ]
      }
    case RECEIVE_ADDITIONAL_FORM:
      return {
        ...state,
        isFetching: false,
        items: [
          ...state.items.filter(item => item.id != action.id || item.form_id != action.additionalForm.form_id),
          {
            ...action.additionalForm,
            id: action.id,
          },
        ],
      }
    default:
      return state
  }
}

export default additionalFormsReducer