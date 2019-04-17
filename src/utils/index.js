import _ from 'lodash';

export const getState = (state, path) => (
  (pathIsEmpty(path))
    ? state
    : _.get(state, path)
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
    : _.setWith(_.clone(state), path, val, _.clone)
)

const pathIsEmpty = path => (
  ['', null, undefined].includes(path) || path.length === 0
)