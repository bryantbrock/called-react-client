import axios from 'axios'

export const baseUrl = 'https://called-backend.herokuapp.com/called-backend'

// Custom request creator
const createRequest = (method, url) => (data, config = {}, endpoint = null, token = null) => {

  // This function takes a method, endoint, url, and data.
  // This will eventually need authentication, which I will 
  // do once I get there.

  const fullPath = endpoint ? `${baseUrl}/${url}/${endpoint}/` : `${baseUrl}/${url}/`

  config = token ? {...config, headers: {...config.headers, authorization: `Token ${token}`}} : config

  return ['post', 'put', 'patch'].includes(method) ? axios[method](fullPath, data, config) : axios[method](fullPath, config)
}


// Requests
export const signIn = createRequest('post', 'obtain-auth-token')
export const signUp = createRequest('post', 'users')
export const sendResetEmail = createRequest('post', 'password-reset')
export const confirmPin = createRequest('post', 'password-reset/validate_token')
export const setNewPassword = createRequest('post', 'password-reset/confirm')
export const getEvent = createRequest('get', 'events')
export const getEvents = createRequest('get', 'events')
export const postRegistrant = createRequest('post', 'registrants')
export const getRegistrant = createRequest('get', 'registrants')
export const getRegistrants = createRequest('get', 'registrants')