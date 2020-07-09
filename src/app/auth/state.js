import {createSlice} from '@reduxjs/toolkit'
import {Errors} from 'app/errors'
import {signIn, signUp} from 'app/requests'
import {history} from 'app/history'

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

// Actions
export const logoutUser = () => dispatch =>
  dispatch(Auth.actions.logout())
export const authenticate = (user, signin = false) => async dispatch => {
  dispatch(Auth.actions.setSubmitted())
  dispatch(Errors.actions.clear())

  await (signin ? signIn(user) : signUp(user))
    .then(res => dispatch(Auth.actions.authSuccess(res)))
    .then(() => dispatch(Errors.actions.success()))
    .then(history.push('/dashboard'))
    .then(dispatch(Errors.actions.clear()))
    .catch(err => {
      dispatch(Auth.actions.authError(err))
      dispatch(Errors.actions.error(err))
    })
}

export default Auth