import * as R from 'ramda'
import * as RA from 'ramda-adjunct'
import { atomicActions } from "../../actions/atomic";
import { replaceAtIndex, insertAtIndex } from "../../actions/for/array/utils";

export const leafReducerArray = (leafState, { creatorKey, payload }) => {
  const state = RA.isArray(leafState) ? leafState : [leafState]
  switch (creatorKey) {
    case atomicActions.CONCAT: return concat(state, payload)
    case atomicActions.DROP: return drop(state, payload)
    case atomicActions.FILTER: return filter(state, payload)
    case atomicActions.PUSH: return push(state, payload)
    default: return state
  }
}

const concat = (leafState, payload) => leafState.concat(payload)

const drop = (leafState, n) => R.drop(n, leafState)

const filter = (leafState, callback) => leafState.filter(callback)

const push = (leafState, { element, index = -1, replace = false } = {}) => (
  replace
    ? replaceAtIndex(leafState, index, element)
    : insertAtIndex(leafState, index, element)
)