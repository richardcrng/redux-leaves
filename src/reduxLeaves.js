import _ from 'lodash';
import { updateState } from './utils';
import { actionsFor } from './actions/';
import { leafReducer } from './leafReducer';

export const reduxLeaves = (initialState) => {
  function rootReducer(
    state = initialState,
    { leaf = {}, type, payload } = {}
  ) {
    const { path, condition, modifier, custom } = leaf

    const prevLeafState = _.size(path) >= 1
      ? _.get(state, path)
      : state

    const newLeafState = leafReducer(prevLeafState, { path, condition, modifier, payload, custom }, state, initialState)

    return (prevLeafState === newLeafState)
      ? state
      : updateLeafState(state, newLeafState, path)
  }

  const actions = actionsFor(_.cloneDeep(initialState))

  return [rootReducer, actions]
}

const updateLeafState = (wholeState, newLeafState, path = []) => (
  _.size(path) >= 1
    ? updateState(wholeState, path, newLeafState)
    : newLeafState
)