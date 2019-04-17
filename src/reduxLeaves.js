import _ from 'lodash';
import { updateState } from './utils';
import { actionsFor } from './actions/';
import { leafReducer } from './leafReducer';
import { getState } from './utils/index';

export const reduxLeaves = (initialState, customLogic = {}) => {
  Object.freeze(initialState)

  function rootReducer(
    state = initialState,
    { leaf = {}, type, payload } = {}
  ) {

    const { path, condition, modifier, custom } = leaf

    const prevLeafState = getState(state, path)

    const newLeafState = leafReducer(
      prevLeafState,
      { path, condition, modifier, payload, custom },
      state,
      initialState,
      customLogic
    )

    return updateLeafState(state, newLeafState, path)
  }

  const actions = actionsFor(_.cloneDeep(initialState), customLogic)

  return [rootReducer, actions]
}

const updateLeafState = (wholeState, newLeafState, path = []) => (
  _.size(path) >= 1
    ? updateState(wholeState, path, newLeafState)
    : newLeafState
)