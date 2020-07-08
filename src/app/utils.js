
export const getToken = getState => {
  // Get Token from local storage
  const token = getState().auth.token

  // Headers
  const config = {
    headers: {
      "content-type": "application/json"
    }
  }

  // If token, add to headers 
  if(token) {
    config.headers['x-auth-token'] = token
  }

  return config
}