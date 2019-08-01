import * as RA from 'ramda-adjunct'
import { atomicActions } from "../../actions/atomic";
import { updateState } from '../..';
import LeafReducerTyped from '../../types/Leaf/Reducer/Typed';

const leafReducerObject: LeafReducerTyped<object> = (leafState, { leaf: { creatorKey }, payload }) => {
  const state = RA.isPlainObject(leafState) ? leafState : Object(leafState)
  switch (creatorKey) {
    case atomicActions.ASSIGN: return assign(state, payload)
    case atomicActions.SET: return set(state, payload)
    default: return state
  }
}

const assign = (state: object, sources: object[]) => Object.assign(
  { ...state },   // stop immer complaining
  ...sources
)

const set = (state: object, { path, value } : { path: string[], value: any }) => updateState(state, path, value)

export default leafReducerObject