import * as RA from 'ramda-adjunct'
import { atomicActions } from "../../actions/atomic";

export const leafReducerString = (leafState, { leaf: { creatorKey }, payload }) => {
  const state = RA.isString(leafState) ? leafState : String(leafState)
  switch (creatorKey) {
    case atomicActions.CONCAT: return concat(state, ...payload)
    case atomicActions.REPLACE: return replace(state, payload)
    default: return state
  }
}

const concat = (leafState, ...strings) => leafState.concat(...strings)

const replace = (leafState, { pattern, replacement }) => leafState.replace(pattern, replacement)