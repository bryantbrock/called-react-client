
export const map = fn => array => array.map(fn)
export const mult = x => y => x * y
export const pluck = key => object => object[key]
export const jsonify = res => res.json()
export const log = res => console.log(res)
export const compose = (...fns) => (args) => 
  fns.reverse().reduceRight((arg, fn) => fn(arg), args)
export const once = (fn) => {
  var done = false
  
  return function () {
    return done ? void 0 : ((done = true), fn.apply(this, arguments))
  }
}

// ====================
// Custom Utils

// Turn an array into an object with empty string as values
export const toObj = (array, key) => {
  const initialValue = {}
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: '',
    }
  }, initialValue)
}
// If there is ever a 'clear form' button,
// I will want this.
export const resetState = state => {
  const newState = {}
  for (let [key] of Object.entries(state)) {
    newState[key] = ''
  }
  return newState
}

export const NBSP = '\u00a0'