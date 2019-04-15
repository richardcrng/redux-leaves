import _ from 'lodash';
import { atomicActions } from "../../actions/atomic";

export const leafReducerString = (leafState, { modifier, payload }) => {
  switch (modifier) {
    case atomicActions.CONCAT: return concat(leafState, ...payload)
    case atomicActions.REPLACE: return replace(leafState, payload)
    default: return leafState
  }
}

const concat = (leafState, ...strings) => leafState.concat(...strings)

const replace = (leafState, { pattern, replacement }) => leafState.replace(pattern, replacement)