import _ from 'lodash';
import { atomicActions } from '../actions/atomic';
import { conditions } from '../actions/condtions';
import { leafReducerArray } from './array/leafReducerArray';
import { leafReducerObject } from './object/leafReducerObject';
import { leafReducerString } from './string/leafReducerString';
import { leafReducerBoolean } from './boolean/leafReducerBoolean';
import { leafReducerNumber } from './number/leafReducerNumber';
import { leafReducerCustom } from './custom/leafReducerCustom';

export const leafReducer = (
  leafState,
  { path, condition, modifier, payload, custom },
  wholeState,
  initialWhole,
  customLogic
  ) => {

  let newState = leafState

  // Custom actions
  if (custom) {
    return leafReducerCustom(customLogic, leafState, { modifier, payload }, wholeState)
  }
  
  // Type-specific actions
  switch (condition) {
    case conditions.ARRAY:
      return leafReducerArray(leafState, {  modifier, payload })
    case conditions.BOOLEAN:
      return leafReducerBoolean(leafState, { modifier })
    case conditions.NUMBER:
      return leafReducerNumber(leafState, { modifier, payload })
    case conditions.OBJECT:
      return leafReducerObject(leafState, { modifier, payload })
    case conditions.STRING:
      return leafReducerString(leafState, { modifier, payload })
  }

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