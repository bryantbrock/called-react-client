import axios from 'axios'

export const baseUrl = 'https://called-backend.herokuapp.com/called-backend'

// Custom request creator
const createRequest = (
  method, 
  url, 
  data = null, 
  config = null, 
  endpoint = null) => {

  // This function takes a method, endoint, url, and data.
  // This will eventually need authentication, which I will 
  // do once I get there.

  const fullPath = endpoint ? `${baseUrl}/${url}/${endpoint}/` : `${baseUrl}/${url}/`

  return axios[method](fullPath, data, config)
    .then(res => res.data)
    .catch(error => error.response.data)
}


// Requests
export const signIn = info => createRequest('post', 'obtain-auth-token', info)
export const signUp = info => createRequest('post', 'users', info)
export const changePassword = info => createRequest('post', 'password-reset', info)
export const confirmPin = pin => createRequest('post', 'password-reset/validate_token', {token: pin})
export const resetPassword = (password, token) => createRequest('post', 'password-reset/confirm', {password, token})
export const getEvent = pk => createRequest('get', 'events', null, null, pk)
export const getEvents = () => createRequest('get', 'events')
export const postRegistrant = (data, config) => createRequest('post', 'registrants', data, config)
export const getRegistrant = (pk, data) => createRequest('get', 'registrants', data, null, pk)
export const getRegistrants = (data) => createRequest('get', 'registrants', data)