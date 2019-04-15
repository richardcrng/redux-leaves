import _ from 'lodash';
import { atomicActions } from "../../actions/atomic";

export const leafReducerNumber = (leafState, { modifier, payload }) => {
  const state = _.isNumber(leafState) ? leafState : _.toNumber(leafState)
  switch (modifier) {
    case atomicActions.INCREMENT: return state + payload
    default: return state
  }
}