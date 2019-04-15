import _ from 'lodash';
import { atomicActions } from '../actions/atomic';
import { conditions } from '../actions/condtions';
import { leafReducerArray } from './array/leafReducerArray';
import { leafReducerObject } from './object/leafReducerObject';
import { leafReducerString } from './string/leafReducerString';
import { leafReducerBoolean } from './boolean/leafReducerBoolean';

export const leafReducer = (leafState, { path, condition, modifier, payload }, wholeState, initialWhole) => {

  let newState = leafState
  
  switch (condition) {
    case conditions.ARRAY:
      newState = leafReducerArray(leafState, {  path, modifier, payload }); break
    case conditions.BOOLEAN:
      newState = leafReducerBoolean(leafState, { modifier }); break
    case conditions.OBJECT:
      newState = leafReducerObject(leafState, { path, modifier, payload }); break
    case conditions.STRING:
      newState = leafReducerString(leafState, { path, modifier, payload }); break
  }

  if (!(newState === leafState)) return newState

  switch (modifier) {
    case atomicActions.APPLY: return apply(payload, leafState, wholeState)
    case atomicActions.CLEAR: return clear(leafState, payload)
    case atomicActions.INCREMENT: return increment(leafState, payload)
    case atomicActions.RESET: return reset(initialWhole, path)
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

const increment = (leafState, n) => leafState + n

const reset = (initialWholeState, path) => _.get(initialWholeState, path)

const update = (leafState, payload) => payload