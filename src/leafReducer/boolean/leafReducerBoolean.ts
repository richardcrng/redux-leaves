import * as RA from 'ramda-adjunct'
import { atomicActions } from "../../actions/atomic";
import LeafReducerTyped from '../../types/Leaf/Reducer/Typed';

const leafReducerBoolean: LeafReducerTyped<boolean> = (leafState, { leaf: { creatorKey } }) => {
  const state = RA.isBoolean(leafState) ? leafState : !!leafState

  switch (creatorKey) {
    case atomicActions.OFF: return false
    case atomicActions.ON: return true
    case atomicActions.TOGGLE: return !state
    default: return state
  }
}

export default leafReducerBoolean