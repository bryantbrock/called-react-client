import {getRegistrants, postRegistrant} from 'app/requests'

export const REQUEST_ADDITIONAL_FORMS = 'REQUEST_ADDITIONAL_FORMS'

function requestAdditionalForms(id) {
  return {
    type: REQUEST_ADDITIONAL_FORMS,
    id: id,
  }
}

export const RECEIVE_ADDITIONAL_FORMS = 'RECEIVE_ADDITIONAL_FORMS'

function receiveAdditionalForms(data, id) {
  return {
    type: RECEIVE_ADDITIONAL_FORMS,
    id: id,
    additionalForms: data,
  }
}

export const RECEIVE_ADDITIONAL_FORM = 'RECEIVE_ADDITIONAL_FORM'

function receiveAdditionalForm(data, id, created=false) {
  return {
    type: RECEIVE_ADDITIONAL_FORM,
    id: id,
    additionalForm: data,
    created: created,
  }
}

export const POST_ADDITIONAL_FORM = 'POST_ADDITIONAL_FORM'

function postAdditionalFormAction(data) {
  return {
    type: POST_ADDITIONAL_FORM,
    additionalForm: data,
  }
}

export function postAdditionalForm(data, token) {

  return function (dispatch) {
    dispatch(postAdditionalFormAction(data))
    let id = data.id

    return postRegistrant(data, {}, `${id}/additional-forms`, token)
      .then(
        response => response.data
      )
      .then(data =>
        dispatch(receiveAdditionalForm(data, id, true))
      ) 
  }
}

export function fetchAdditionalForms(id, token) {

  return function (dispatch) {

    dispatch(requestAdditionalForms(id))

    return getRegistrants({}, {}, `${id}/additional-forms`, token)
      .then(
        response => response.data
      )
      .then(json =>
        dispatch(receiveAdditionalForms(json, id))
      )
  }
}

export function backgroundFetchAdditionalForms(id, token) {

  return function (dispatch) {

    return getRegistrants({}, {}, `${id}/additional-forms`, token)
      .then(
        response => response.data
      )
      .then(json =>
        dispatch(receiveAdditionalForms(json, id))
      )
  }
}