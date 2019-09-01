import * as R from 'ramda'
import * as RA from 'ramda-adjunct'
import Dict from "../../types/Dict";
import LeafReducerConfig from "../../types/Leaf/Reducer/Config";
import { forAny } from '../for/any';
import { forArray } from '../for/array';
import { forBoolean } from '../for/boolean';
import { forNumber } from '../for/number';
import { forObject } from '../for/object';
import { forString } from '../for/string';
import { makeCustomActions } from '../custom';

function actionsAPI (stateShape: Dict<any>, customReducers: Dict<LeafReducerConfig>, pathToLeafOrBranch: string[] = []) {
  const initialState = pathToLeafOrBranch.length >= 1
    ? R.path(pathToLeafOrBranch, stateShape)
    : stateShape

  const basicActionCreators = forAny(pathToLeafOrBranch)
  const asArray = forArray(pathToLeafOrBranch)
  const asBoolean = forBoolean(pathToLeafOrBranch)
  const asNumber = forNumber(pathToLeafOrBranch)
  const asObject = forObject(pathToLeafOrBranch)
  const asString = forString(pathToLeafOrBranch)
  const custom = makeCustomActions(customReducers, pathToLeafOrBranch)

  let actionCreators

  if (RA.isBoolean(initialState)) {
    actionCreators = asBoolean
  } else if (RA.isArray(initialState)) {
    actionCreators = asArray
  } else if (RA.isNumber(initialState)) {
    actionCreators = asNumber
  } else if (RA.isPlainObject(initialState)) {
    actionCreators = asObject
  } else if (RA.isString(initialState)) {
    actionCreators = asString
  }

  return {
    ...basicActionCreators,
    ...actionCreators,
    asArray,
    asBoolean,
    asNumber,
    asObject,
    asString,
    custom,
    ...custom
  }
}

export default actionsAPI