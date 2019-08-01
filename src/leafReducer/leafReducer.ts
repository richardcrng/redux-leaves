import * as R from 'ramda'
import * as RA from 'ramda-adjunct'
import produce from 'immer'
import { atomicActions } from '../actions/atomic';
import { conditions } from '../actions/condtions';
import leafReducerArray from './array/';
import { leafReducerObject } from './object/leafReducerObject';
import { leafReducerString } from './string/leafReducerString';
import { leafReducerBoolean } from './boolean/leafReducerBoolean';
import { leafReducerNumber } from './number/leafReducerNumber';
import { leafReducerCustom } from './custom/leafReducerCustom';
import LeafStandardAction from '../types/Actions/LSA';
import Dict from '../types/Dict';
import LeafReducerConfig from '../types/Leaf/Reducer/Config';
import LeafActionData from '../types/Leaf/Action/Data';

export const leafReducer = (
  leafState: any,
  action: LeafStandardAction,
  wholeState: any,
  initialWhole: any,
  reducersDict: Dict<LeafReducerConfig>
  ) => {

  const { leaf = {}, payload } = action;
  const { condition, custom, creatorKey, path } = leaf as LeafActionData;

  return produce(leafState, (draftLeafState: any) : any => {
    // Custom actions
    if (custom) {
      return leafReducerCustom(draftLeafState, action, wholeState, reducersDict)
    }

    // Type-specific actions
    switch (condition) {
      case conditions.ARRAY:
        return leafReducerArray(draftLeafState, action)
      case conditions.BOOLEAN:
        return leafReducerBoolean(draftLeafState, action)
      case conditions.NUMBER:
        return leafReducerNumber(draftLeafState, action)
      case conditions.OBJECT:
        return leafReducerObject(draftLeafState, action)
      case conditions.STRING:
        return leafReducerString(draftLeafState, action)
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

const apply = (callback: (leafState: any, treeState: any) => any, leafState: any, wholeState: any) => (
  callback(leafState, wholeState)
)

const clear = (leafState: any, toNull?: boolean) => {
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

const reset = (initialWholeState: any, path: string[]) => (
  path.length >= 1 ? R.path(path, initialWholeState) : initialWholeState
)