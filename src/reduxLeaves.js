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
    const prevLeafState = _.get(state, path)
    const newLeafState = leafReducer(prevLeafState, { path, modifier, payload }, state, initialState)

    return (prevLeafState === newLeafState)
      ? state
      : updateState(state, path, newLeafState)
  }

  const actions = actionsFor(_.cloneDeep(initialState))

  return [rootReducer, actions]
}