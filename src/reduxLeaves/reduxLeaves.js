import _ from 'lodash';
import { actionsFor } from '../actionsFor/actionsFor';
import { atomicActions } from '../actions/atomic';
import { updateState } from './utils';

export const reduxLeaves = (initialState) => {
  function rootReducer(
    state = initialState,
    { leaf = {}, type, payload } = {}
  ) {
    const { path, condition, modifier } = leaf
    const prevLeafState = _.get(state, path)
    const newLeafState = reduceLeaf(prevLeafState, { modifier, payload }, state)

    return (prevLeafState === newLeafState)
      ? state
      : updateState(state, path, newLeafState)
  }

  const actions = actionsFor(_.cloneDeep(initialState))

  return [rootReducer, actions]
}

const reduceLeaf = (leafState, { modifier, payload }, wholeState) => {
  switch (modifier) {
    case atomicActions.APPLY: return apply(payload, leafState, wholeState)
    default: return leafState
  }
}

const apply = (callback, leafState, wholeState) => (
  callback(leafState, wholeState)
)