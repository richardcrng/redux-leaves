import _ from 'lodash';
import { atomicActions } from "../../actions/atomic";

export const leafReducerBoolean = (leafState, { creatorKey }) => {
  const state = _.isBoolean(leafState) ? leafState : !!leafState

  switch (creatorKey) {
    case atomicActions.OFF: return false
    case atomicActions.ON: return true
    case atomicActions.TOGGLE: return !state
    default: return state
  }
}