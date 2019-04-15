import _ from 'lodash';

export const addActionsAtPath = (reducer, path = []) => {
  return reducer
}

const updateState = (state, path, val) => (
  _.setWith(_.clone(state), path, val, _.clone)
)