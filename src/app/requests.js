import axios from "axios"

const createRequest = method => (url, config, body = {}) => 
  body ? axios[method](url, config, body) : axios[method](url, config)
const createPostRequest = fn => (url, config, data) => {
  const body = fn ? fn(data) : data
  
  return createRequest('post')(url, config, body)
}

export const req = {
  postJSON: createPostRequest(),
  get: createRequest('get'),
}