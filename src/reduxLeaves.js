import _ from 'lodash';
import { updateState } from './utils';
import { actionsFor } from './actions/';
import { leafReducer } from './leafReducer';

export const reduxLeaves = (initialState) => {
  function rootReducer(
    state = initialState,
    { leaf = {}, type, payload } = {}
  ) {
    const { path, condition, modifier } = leaf

    const prevLeafState = _.size(path) >= 1
      ? _.get(state, path)
      : state

    const newLeafState = leafReducer(prevLeafState, { path, condition, modifier, payload }, state, initialState)

    return (prevLeafState === newLeafState)
      ? state
      : updateState(state, path, newLeafState)
  }

  const actions = actionsFor(_.cloneDeep(initialState))

  return [rootReducer, actions]
}