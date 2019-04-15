import _ from 'lodash';
import { atomicActions } from "../../actions/atomic";

export const leafReducerNumber = (leafState, { modifier, payload }) => {
  switch (modifier) {
    case atomicActions.INCREMENT: return leafState + payload
    default: return leafState
  }
}