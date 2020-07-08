export const redirectOnSuccess = state => {
  const {status, redirect} = state.errors
  return (status === 200 && redirect) ? true : false
}

