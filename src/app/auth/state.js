import axios from 'axios'
import {createSlice} from '@reduxjs/toolkit'
import {Errors} from 'app/errors'

const initialState = {
  token: null,
  isAuthenticated: null,
  isLoading: false,
  user: {},
}

export const Auth = createSlice({
  name: 'auth',
  initialState,
  reducers: { 
    setSubmitted: state => ({...state, isLoading: true}),
    logout: state => ({...state, isAuthenticated: false, user: {}, token: null}),
    authError: state => ({...state, isLoading: false, isAuthenticated: false, token: null}),
    authSuccess: (state, action) => 
      ({...state, user: action.payload.user, isAuthenticated: true, isLoading: false, token: action.payload.token})
  }
})


// Logic
const getToken = getState => getState().auth.token
const setSuccess = res => dispatch => {
  dispatch(Auth.actions.authSuccess(res))
  dispatch(Errors.actions.success())
}
const setError = err => dispatch => {
  dispatch(Auth.actions.authError(err))
  dispatch(Errors.actions.error(err))
}

// Thunks
export const logoutUser = () => dispatch => {
  try {
    localStorage.removeItem('token')
    dispatch(Auth.actions.logout())
  } catch (err) {
    console.error('failed to logout')
  }
}
export const submitAuthForm = (user, url = '') => async (dispatch, getState) => {
  dispatch(Auth.actions.setSubmitted())
  await axios.post(`/api/auth/${url}`, user, getToken(getState))
    .then(res => {
      localStorage.setItem('token', res.data.token)
      dispatch(setSuccess(res.data))
    })
    .catch(err => dispatch(setError(err.response)))
  return
}

// Export the slice
export default Auth