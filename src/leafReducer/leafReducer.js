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
  action,
  wholeState,
  initialWhole,
  reducersDict
  ) => {

  const { leaf = {}, payload } = action;
  const { condition, custom, creatorKey, path } = leaf;

  // Custom actions
  if (custom) {
    return leafReducerCustom(reducersDict, leafState, action, wholeState)
  }
  
  // Type-specific actions
  switch (condition) {
    case conditions.ARRAY:
      return leafReducerArray(leafState, { creatorKey, payload })
    case conditions.BOOLEAN:
      return leafReducerBoolean(leafState, { creatorKey })
    case conditions.NUMBER:
      return leafReducerNumber(leafState, { creatorKey, payload })
    case conditions.OBJECT:
      return leafReducerObject(leafState, { creatorKey, payload })
    case conditions.STRING:
      return leafReducerString(leafState, { creatorKey, payload })
  }

  // Type-agnostic actions
  switch (creatorKey) {
    case atomicActions.APPLY: return apply(payload, leafState, wholeState)
    case atomicActions.CLEAR: return clear(leafState, payload)
    case atomicActions.RESET: return reset(initialWhole, path)
    case atomicActions.UPDATE: return payload
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