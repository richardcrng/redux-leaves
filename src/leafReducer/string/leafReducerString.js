import _ from 'lodash';
import { atomicActions } from "../../actions/atomic";

export const leafReducerString = (leafState, { modifier, payload }) => {
  const state = _.isString(leafState) ? leafState : _.toString(leafState)
  switch (modifier) {
    case atomicActions.CONCAT: return concat(state, ...payload)
    case atomicActions.REPLACE: return replace(state, payload)
    default: return state
  }
}

const concat = (leafState, ...strings) => leafState.concat(...strings)

const replace = (leafState, { pattern, replacement }) => leafState.replace(pattern, replacement)