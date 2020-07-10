import {definePrefixedEnum} from 'utils/misc'

export const loginFields = [
  {label: 'Email', name: 'email'},
  {label: 'Password', name: 'password', type: 'password'},
]

export const registerFields = [
  {label: 'First Name', name: 'first_name'},
  {label: 'Last Name', name: 'last_name'},
  {label: 'Email', name: 'email'},
  {label: 'Password', name: 'password', type: 'password'},
  {label: 'Confirm Password', name: 'verify', type: 'password'},
]

export const AUTH_TYPES = definePrefixedEnum('auth/', [
  'sign_in',
  'sign_up',
])