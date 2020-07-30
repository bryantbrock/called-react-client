import {createSlice} from '@reduxjs/toolkit'
import {signIn, signUp} from 'app/requests'
import history from 'app/history'

const initialState = {
  token: null,
  isAuthenticated: null,
  isLoading: false,
  errors: null,
  user: {},
}

export const Auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    isLoading: state => ({...state, isLoading: true, errors: null}),
    clearErrors: state => ({...state, errors: null}),
    authFail: (state, action) => ({
      ...state,
      isLoading: false,
      errors: action.payload,
    }),
    logout: state => ({
      ...state,
      isAuthenticated: false,
      user: {},
      token: null,
      errors: null,
    }),
    authSuccess: (state, action) => ({
      ...state,
      user: action.payload || {},
      isAuthenticated: true,
      isLoading: false,
      token: action.payload.token,
      errors: null,
    })
  }
})

// Actions
export const authenticate = (user, signin = false) => async dispatch => {
  dispatch(Auth.actions.isLoading())

  await (signin ? signIn(user) : signUp(user))
    .then(res => dispatch(Auth.actions.authSuccess(res.data)))
    .then(() => history.push('/dashboard'))
    .catch(err => dispatch(Auth.actions.authFail(err.response.data)))
}

export default Auth