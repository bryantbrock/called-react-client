import axios from 'axios'

export const baseUrl = 'https://called-backend.herokuapp.com/called-backend'

// Custom request creator
const createRequest = (method, url) => (data, config = null, endpoint = null) => {

  // This function takes a method, endoint, url, and data.
  // This will eventually need authentication, which I will 
  // do once I get there.

  const fullPath = endpoint ? `${baseUrl}/${url}/${endpoint}/` : `${baseUrl}/${url}/`

  return axios[method](fullPath, data, config)
}


// Requests
export const signIn = createRequest('post', 'obtain-auth-token')
export const signUp = createRequest('post', 'users')
export const changePassword = createRequest('post', 'password-reset')
export const confirmPin = createRequest('post', 'password-reset/validate_token')
export const resetPassword = createRequest('post', 'password-reset/confirm')
export const getEvent = createRequest('get', 'events')
export const getEvents = createRequest('get', 'events')
export const postRegistrant = createRequest('post', 'registrants')
export const getRegistrant = createRequest('get', 'registrants')
export const getRegistrants = createRequest('get', 'registrants')