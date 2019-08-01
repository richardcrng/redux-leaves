import * as RA from 'ramda-adjunct'
import { atomicActions } from "../../actions/atomic";
import LeafReducerTyped from '../../types/Leaf/Reducer/Typed';

const leafReducerString: LeafReducerTyped<string> = (leafState, { leaf: { creatorKey }, payload }) => {
  const state = RA.isString(leafState) ? leafState : String(leafState)
  switch (creatorKey) {
    case atomicActions.CONCAT: return concat(state, ...payload)
    case atomicActions.REPLACE: return replace(state, payload)
    default: return state
  }
}

const concat = (leafState: string, ...strings: string[]) => leafState.concat(...strings)

const replace = (
  leafState: string,
  { pattern, replacement } : { pattern: string | RegExp, replacement: string }
) => leafState.replace(pattern, replacement)

export default leafReducerString