import _ from 'lodash';
import { atomicActions } from '../actions/atomic';
import { conditions } from '../actions/condtions';
import { leafReducerArray } from './array/leafReducerArray';
import { leafReducerObject } from './object/leafReducerObject';
import { leafReducerString } from './string/leafReducerString';
import { leafReducerBoolean } from './boolean/leafReducerBoolean';
import { leafReducerNumber } from './number/leafReducerNumber';

export const leafReducer = (leafState, { path, condition, modifier, payload, custom }, wholeState, initialWhole) => {

  let newState = leafState
  
  // Type-specific actions
  switch (condition) {
    case conditions.ARRAY:
      newState = leafReducerArray(leafState, {  modifier, payload }); break
    case conditions.BOOLEAN:
      newState = leafReducerBoolean(leafState, { modifier }); break
    case conditions.NUMBER:
      newState = leafReducerNumber(leafState, { modifier, payload }); break
    case conditions.OBJECT:
      newState = leafReducerObject(leafState, { modifier, payload }); break
    case conditions.STRING:
      newState = leafReducerString(leafState, { modifier, payload }); break
  }

  if (!(newState === leafState)) return newState

  // Type-agnostic actions
  switch (modifier) {
    case atomicActions.APPLY: return apply(payload, leafState, wholeState)
    case atomicActions.CLEAR: return clear(leafState, payload)
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

const reset = (initialWholeState, path) => (
  _.size(path) >= 1 ? _.get(initialWholeState, path) : initialWholeState
)

const update = (leafState, payload) => payload