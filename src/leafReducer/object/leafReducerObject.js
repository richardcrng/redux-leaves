import _ from 'lodash';
import { atomicActions } from "../../actions/atomic";
import { updateState } from '../..';

export const leafReducerObject = (leafState, { creatorKey, payload }) => {
  const state = _.isPlainObject(leafState) ? leafState : _.toPlainObject(leafState)
  switch (creatorKey) {
    case atomicActions.ASSIGN: return assign(state, payload)
    case atomicActions.SET: return set(state, payload)
    default: return state
  }
}

const assign = (state, sources) => Object.assign(
  { ...state },   // stop immer complaining
  ...sources
)

const set = (state, { path, value }) => updateState(state, path, value)