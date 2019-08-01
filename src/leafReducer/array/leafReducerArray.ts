import * as R from 'ramda'
import * as RA from 'ramda-adjunct'
import { atomicActions } from "../../actions/atomic";
import { replaceAtIndex, insertAtIndex } from "../../actions/for/array/utils";
import LeafReducerTyped from '../../types/Leaf/Reducer/Typed';

const leafReducerArray : LeafReducerTyped<any[]> = (leafState, { leaf: { creatorKey }, payload }) => {
  const state = RA.isArray(leafState) ? leafState : [leafState]
  switch (creatorKey) {
    case atomicActions.CONCAT: return concat(state, payload)
    case atomicActions.DROP: return drop(state, payload)
    case atomicActions.FILTER: return filter(state, payload)
    case atomicActions.PUSH: return push(state, payload)
    default: return state
  }
}

const concat = (leafState: any[], payload: any) => leafState.concat(payload)

const drop = (leafState: any[], n: number = 1) => R.drop(n, leafState)

const filter = (leafState: any[], callback: (element: any, index: number, array: any[]) => any[]) => leafState.filter(callback)

const push = (
  leafState: any[],
  { element, index = -1, replace = false } : {
    element: any, index?: number, replace?: boolean
  }) => (
  replace
    ? replaceAtIndex(leafState, index, element)
    : insertAtIndex(leafState, index, element)
)

export default leafReducerArray