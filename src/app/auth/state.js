import {createSlice} from '@reduxjs/toolkit'
import {Errors} from 'app/errors'
import {AUTH_TYPES} from 'app/auth/constants'
import {signIn, signUp} from 'app/requests'

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

// Action Creators
const setSuccess = res => dispatch => {
  dispatch(Auth.actions.authSuccess(res))
  dispatch(Errors.actions.success())
}
const setError = err => dispatch => {
  dispatch(Auth.actions.authError(err))
  dispatch(Errors.actions.error(err))
}
export const logoutUser = () => dispatch => {
  try {
    dispatch(Auth.actions.logout())
  } catch (err) {
    setError(err)
  }
}

// Requests
export const submitAuthForm = (user, type = AUTH_TYPES.SIGN_IN) => async dispatch => {
  dispatch(Auth.actions.setSubmitted())

  switch(type) {
    case AUTH_TYPES.SIGN_IN:
      return signIn(user)
        .then(setSuccess)
        .catch(setError)
    case AUTH_TYPES.SIGN_UP:
      return signUp(user)
        .then(setSuccess)
        .catch(setError)
    default:
      return console.error('bad auth submission')
  }
}

export default Auth