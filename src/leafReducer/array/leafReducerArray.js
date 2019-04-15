import _ from 'lodash';
import { atomicActions } from "../../actions/atomic";
import { replaceAtIndex, insertAtIndex } from "../../actions/for/array/utils";

export const leafReducerArray = (leafState, { path, modifier, payload }, wholeState, initialWhole) => {
  switch (modifier) {
    case atomicActions.CONCAT: return concat(leafState, payload)
    case atomicActions.DROP: return drop(leafState, payload)
    case atomicActions.PUSH: return push(leafState, payload)
    default: return leafState
  }
}

const concat = (leafState, payload) => leafState.concat(payload)

const drop = (leafState, n) => _.drop(leafState, n)

const push = (leafState, { element, index = -1, replace = false } = {}) => (
  replace
    ? replaceAtIndex(leafState, index, element)
    : insertAtIndex(leafState, index, element)
)