import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  status: null,
  message: '',
  id: null,
  fields: null,
  redirect: false,
}

const Errors = createSlice({
  name: 'errors',
  initialState, 
  reducers: {
    clear: () => ({
      status: null,
      message: '',
      id: null,
      fields: null,
      redirect: false,
    }),
    error: (state, action) => ({
      ...state,
      status: action.payload.status,
      message: action.payload.data.msg,
      id: action.payload.data.id,
      fields: action.payload.data.fields,
    }),
    success: () => ({
      status: 200,
      messgae: 'success',
      redirect: true,
      id: 0,
      fields: null,
    }),
  }
})

// Thunks
export const clearErrors = () => dispatch => dispatch(Errors.actions.clear())


export default Errors