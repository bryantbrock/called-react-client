import {definePrefixedEnum} from 'utils/misc'

export const loginFields = [
  {label: 'Email', name: 'email'},
  {label: 'Password', name: 'password', type: 'password'},
]

export const registerFields = [
  {label: 'Name', name: 'name'},
  {label: 'Email', name: 'email'},
  {label: 'Password', name: 'password', type: 'password'},
  {label: 'Confirm Password', name: 'verify', type: 'password'},
]

export const AUTH_TYPES = definePrefixedEnum('auth/', [
  'sign_in',
  'sign_up',
])