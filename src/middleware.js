import Raven from 'raven-js'

export const logger = store => next => action => {
  console.log('dispatching', action)
  let res = next(action)
  console.log('Next state: ', store.getState())
  return res
}

export const crashReporter = store => next => action => {
  try {
    return next(action)
  } catch (err) {
    console.error('Caught an exception!', err)
    Raven.captureException(err, {
      extra: {
        action,
        state: store.getState()
      }
    })
    throw err
  }
}

export const thunk = store => next => action =>
  typeof action === 'function'
    ? action(store.dispatch, store.getState)
    : next(action)