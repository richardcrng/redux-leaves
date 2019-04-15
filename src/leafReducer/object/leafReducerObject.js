import _ from 'lodash';
import { atomicActions } from "../../actions/atomic";
import { replaceAtIndex, insertAtIndex } from "../../actions/for/array/utils";
import { updateState } from '../../..';

export const leafReducerObject = (leafState, { path, modifier, payload }, wholeState, initialWhole) => {
  switch (modifier) {
    case atomicActions.SET: return set(leafState, payload)
    default: return leafState
  }
}

const set = (state, { path, value }) => updateState(state, path, value)