import _ from 'lodash';
import { atomicActions } from "../../actions/atomic";
import { replaceAtIndex, insertAtIndex } from "../../actions/for/array/utils";

export const leafReducerArray = (leafState, { path, modifier, payload }, wholeState, initialWhole) => {
  const state = _.isArray(leafState) ? leafState : _.toArray(leafState)
  switch (modifier) {
    case atomicActions.CONCAT: return concat(state, payload)
    case atomicActions.DROP: return drop(state, payload)
    case atomicActions.PUSH: return push(state, payload)
    default: return state
  }
}

const concat = (leafState, payload) => leafState.concat(payload)

const drop = (leafState, n) => _.drop(leafState, n)

const push = (leafState, { element, index = -1, replace = false } = {}) => (
  replace
    ? replaceAtIndex(leafState, index, element)
    : insertAtIndex(leafState, index, element)
)