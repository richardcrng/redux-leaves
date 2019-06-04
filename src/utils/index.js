import * as R from 'ramda'

export const getState = (state, path) => (
  (pathIsEmpty(path))
    ? state
    : Array.isArray(path)
      ? R.path(path, state)
      : R.path(path.split('.'), state)
)

export const resetState = (state, path, initialState) => (
  updateState(
    state,
    path,
    getState(initialState, path)
  )
)

export const updateState = (state, path, val) => (
  (pathIsEmpty(path))
    ? val
    : Array.isArray(path)
      ? R.assocPath(path, val, state)
      : R.assocPath(path.split('.'), val, state)
)

const pathIsEmpty = path => (
  ['', null, undefined].includes(path) || path.length === 0
)