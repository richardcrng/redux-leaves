import _ from 'lodash';
import { atomicActions } from './actions/atomic';
import { updateState } from './utils';
import { insertAtIndex, deleteAtIndex, replaceAtIndex } from './actions/for/array/utils';
import { actionsFor } from './actions/for/actionsFor';

export const reduxLeaves = (initialState) => {
  function rootReducer(
    state = initialState,
    { leaf = {}, type, payload } = {}
  ) {
    const { path, condition, modifier } = leaf
    const prevLeafState = _.get(state, path)
    const newLeafState = reduceLeaf(prevLeafState, { path, modifier, payload }, state, initialState)

    return (prevLeafState === newLeafState)
      ? state
      : updateState(state, path, newLeafState)
  }

  const actions = actionsFor(_.cloneDeep(initialState))

  return [rootReducer, actions]
}

const reduceLeaf = (leafState, { path, modifier, payload }, wholeState, initialWhole) => {
  switch (modifier) {
    case atomicActions.APPLY: return apply(payload, leafState, wholeState)
    case atomicActions.CLEAR: return clear(leafState, payload)
    case atomicActions.CONCAT: return concat(leafState, payload)
    case atomicActions.DROP: return drop(leafState, payload)
    case atomicActions.INCREMENT: return increment(leafState, payload)
    case atomicActions.OFF: return off(leafState)
    case atomicActions.ON: return on(leafState)
    case atomicActions.PUSH: return push(leafState, payload)
    case atomicActions.RESET: return reset(initialWhole, path)
    case atomicActions.SET: return set(leafState, payload)
    case atomicActions.TOGGLE: return toggle(leafState)
    case atomicActions.UPDATE: return update(leafState, payload)
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

const push = (leafState, { element, index = -1, replace = false } = {}) => (
  replace
    ? replaceAtIndex(leafState, index, element)
    : insertAtIndex(leafState, index, element)
)

const reset = (initialWholeState, path) => _.get(initialWholeState, path)

const set = (state, { path, value }) => updateState(state, path, value)

const toggle = leafState => !leafState

const update = (leafState, newState) => newState