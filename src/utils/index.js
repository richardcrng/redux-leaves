import _ from 'lodash';

export const resetState = (state, path, initialState) => (
  updateState(
    state,
    path,
    _.get(initialState, path)
  )
)

export const updateState = (state, path, val) => (
  _.setWith(_.clone(state), path, val, _.clone)
)