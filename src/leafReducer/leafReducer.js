import * as R from 'ramda'
import * as RA from 'ramda-adjunct'
import produce from 'immer'
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

  return produce(leafState, draftLeafState => {
    // Custom actions
    if (custom) {
      return leafReducerCustom(reducersDict, draftLeafState, action, wholeState)
    }

    // Type-specific actions
    switch (condition) {
      case conditions.ARRAY:
        return leafReducerArray(draftLeafState, { creatorKey, payload })
      case conditions.BOOLEAN:
        return leafReducerBoolean(draftLeafState, { creatorKey })
      case conditions.NUMBER:
        return leafReducerNumber(draftLeafState, { creatorKey, payload })
      case conditions.OBJECT:
        return leafReducerObject(draftLeafState, { creatorKey, payload })
      case conditions.STRING:
        return leafReducerString(draftLeafState, { creatorKey, payload })
    }

    // Type-agnostic actions
    switch (creatorKey) {
      case atomicActions.APPLY: return apply(payload, draftLeafState, wholeState)
      case atomicActions.CLEAR: return clear(draftLeafState, payload)
      case atomicActions.RESET: return reset(initialWhole, path)
      case atomicActions.UPDATE: return payload
      default: return draftLeafState
    }
  })
}

const apply = (callback, leafState, wholeState) => (
  callback(leafState, wholeState)
)

const clear = (leafState, toNull) => {
  if (toNull) {
    return null
  } else if (RA.isBoolean(leafState)) {
    return false
  } else if (RA.isString(leafState)) {
    return ''
  } else if (RA.isArray(leafState)) {
    return []
  } else if (RA.isNumber(leafState)) {
    return 0
  } else if (RA.isPlainObject(leafState)) {
    return {}
  }
}

const reset = (initialWholeState, path) => (
  path.length >= 1 ? R.path(path, initialWholeState) : initialWholeState
)