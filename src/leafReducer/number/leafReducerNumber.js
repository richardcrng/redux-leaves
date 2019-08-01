import * as RA from 'ramda-adjunct'
import { atomicActions } from "../../actions/atomic";

export const leafReducerNumber = (leafState, { leaf: { creatorKey }, payload }) => {
  const state = RA.isNumber(leafState) ? leafState : Number(leafState)
  switch (creatorKey) {
    case atomicActions.INCREMENT: return state + payload
    default: return state
  }
}