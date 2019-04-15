import _ from 'lodash';
import { atomicActions } from "../../actions/atomic";

export const leafReducerString = (leafState, { modifier, payload }) => {
  switch (modifier) {
    case atomicActions.CONCAT: return concat(leafState, ...payload)
    default: return leafState
  }
}

const concat = (leafState, ...strings) => leafState.concat(...strings)