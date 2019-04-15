import _ from 'lodash';
import { actionsFor } from '../actionsFor/actionsFor';
import { atomicActions } from '../actions/atomic';
import { updateState } from './utils';

export const reduxLeaves = (initialState) => {
  function reducer(
    state = initialState,
    { leaf = {}, type, payload } = {}
  ) {
    const { path, condition, modifier } = leaf
    const prevLeafState = _.get(state, path)
    let newLeafState = prevLeafState

    switch (modifier) {
      case atomicActions.APPLY:
        newLeafState = apply(payload, newLeafState, state); break
    }

    return (prevLeafState === newLeafState)
      ? state
      : updateState(state, path, newLeafState)
  }

  const actions = actionsFor(_.cloneDeep(initialState))

  return [reducer, actions]
}

const apply = (callback, leafState, wholeState) => (
  callback(leafState, wholeState)
)