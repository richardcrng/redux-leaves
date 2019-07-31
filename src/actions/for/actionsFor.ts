import * as R from 'ramda'
import * as RA from 'ramda-adjunct'
import { forArray } from './array';
import { forObject } from './object';
import { forBoolean } from './boolean';
import { forNumber } from './number';
import { forAny } from './any';
import { forString } from './string/forString';
import { makeCustomActions } from '../custom';
import Dictionary from '../../types/Dictionary';
import LeafReducer from '../../types/LeafReducer';
import StateShapeBranch from '../../types/StateShape/Branch';
import StateShapeLeaf from '../../types/StateShape/Leaf';

export const actionsFor = (stateShape: any, customReducers: Dictionary<LeafReducer>) => {
  const paths = recursivelyGeneratePaths(stateShape)
  let actions: object = { create: createFor(stateShape, customReducers) }

  paths.forEach(path => {
    const isPathToBranch = isBranch(R.path(path, stateShape))
    if (isPathToBranch) {
      actions = addActionsToBranch(actions, path, stateShape, customReducers)
    } else {
      actions = addActionsToLeaf(actions, path, stateShape, customReducers)
    }
  })
  
  return actions
}

const actionsForLeafOrBranch = (leafOrBranch: StateShapeLeaf | StateShapeBranch, pathToLeafOrBranch: string[] = [], stateShape: any, customReducers: Dictionary<LeafReducer>) => {
  if (leafOrBranch) leafOrBranch.create = createFor(stateShape, customReducers, pathToLeafOrBranch)
  return leafOrBranch
}

const addActionsToBranch = (actions, path, stateShape, customReducers) => {
  const branch = R.path(path, stateShape)
  return R.assocPath(path, actionsForLeafOrBranch(branch, path, stateShape, customReducers), actions)
}

const addActionsToLeaf = (actions, path, stateShape, customReducers) => {
  return R.assocPath(path, actionsForLeafOrBranch({}, path, stateShape, customReducers), actions)
}

const createFor = (stateShape, customReducers, pathToLeafOrBranch = []) => {
  const initialState = pathToLeafOrBranch.length >= 1
    ? R.path(pathToLeafOrBranch, stateShape)
    : stateShape

  let actionCreators

  const basicActionCreators = forAny(pathToLeafOrBranch)
  const asArray = forArray(pathToLeafOrBranch)
  const asBoolean = forBoolean(pathToLeafOrBranch)
  const asNumber = forNumber(pathToLeafOrBranch)
  const asObject = forObject(pathToLeafOrBranch)
  const asString = forString(pathToLeafOrBranch)
  const custom = makeCustomActions(customReducers, pathToLeafOrBranch)

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

const isBranch = leafOrBranch => (
  (!Array.isArray(leafOrBranch)
    && RA.isPlainObj(leafOrBranch)
    && Object.values(leafOrBranch).length >= 1)
)

const recursivelyGeneratePaths = (stateShape, paths = [], currentPath = []) => {
  if (RA.isPlainObject(stateShape)) {
    Object.entries(stateShape).forEach(
      ([key, val]) => {
        const newPath = [...currentPath, key]
        paths.push(newPath)
        recursivelyGeneratePaths(val, paths, newPath)
      }
    )
  }
  return paths
}