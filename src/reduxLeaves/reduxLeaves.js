import _ from 'lodash';
import { actionsFor } from '../actionsFor/actionsFor';
import { atomicActions } from '../actions/atomic';
import { updateState } from './utils';

export const reduxLeaves = (initialState) => {
  function rootReducer(
    state = initialState,
    { leaf = {}, type, payload } = {}
  ) {
    const { path, condition, modifier } = leaf
    const prevLeafState = _.get(state, path)
    const newLeafState = reduceLeaf(prevLeafState, { path, modifier, payload }, state)

    return (prevLeafState === newLeafState)
      ? state
      : updateState(state, path, newLeafState)
  }

  const actions = actionsFor(_.cloneDeep(initialState))

  return [rootReducer, actions]
}

const reduceLeaf = (leafState, { path, modifier, payload }, wholeState) => {
  switch (modifier) {
    case atomicActions.APPLY: return apply(payload, leafState, wholeState)
    case atomicActions.CLEAR: return clear(leafState, payload)
    case atomicActions.CONCAT: return concat(leafState, payload)
    case atomicActions.DROP: return drop(leafState, payload)
    case atomicActions.INCREMENT: return increment(leafState, payload)
    case atomicActions.OFF: return off(leafState)
    case atomicActions.ON: return on(leafState)
    default: return leafState
  }
}

const apply = (callback, leafState, wholeState) => (
  callback(leafState, wholeState)
)

const clear = (leafState, toNull) => {
  if (toNull) {
    return null
  } else if (_.isBoolean(leafState)) {
    return false
  } else if (_.isString(leafState)) {
    return ''
  } else if (_.isArray(leafState)) {
    return []
  } else if (_.isNumber(leafState)) {
    return 0
  } else if (_.isPlainObject(leafState)) {
    return {}
  }
}

const concat = (leafState, payload) => leafState.concat(payload)

const drop = (leafState, n) => _.drop(leafState, n)

const increment = (leafState, n) => leafState + n

const off = () => false

const on = () => true