import _ from 'lodash';
import { atomicActions } from "../../actions/atomic";

export const leafReducerBoolean = (leafState, { modifier }) => {
  switch (modifier) {
    case atomicActions.OFF: return false
    case atomicActions.ON: return true
    case atomicActions.TOGGLE: return !leafState
    default: return leafState
  }
}