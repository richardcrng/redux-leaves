import * as RA from 'ramda-adjunct'
import { atomicActions } from "../../actions/atomic";
import LeafReducerTyped from '../../types/Leaf/Reducer/Typed';

const leafReducerNumber: LeafReducerTyped<number> = (leafState, { leaf: { creatorKey }, payload }) => {
  const state = RA.isNumber(leafState) ? leafState : Number(leafState)
  switch (creatorKey) {
    case atomicActions.INCREMENT: return state + payload
    default: return state
  }
}

export default leafReducerNumber