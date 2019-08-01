import * as R from 'ramda'
import * as RA from 'ramda-adjunct'
import { forArray } from './array';
import { forObject } from './object';
import { forBoolean } from './boolean';
import { forNumber } from './number';
import { forAny } from './any';
import { forString } from './string/forString';
import { makeCustomActions } from '../custom';
import Dict from '../../types/Dict';
import StateBranch from '../../types/State/Branch';
import StateLeaf from '../../types/State/Leaf';
import StateTree from '../../types/State/Tree';
import ActionsBranch from '../../types/Actions/Branch';
import ActionsTree from '../../types/Actions/Tree';
import LeafReducerConfig from '../../types/Leaf/Reducer/Config';
import ActionsLeaf from '../../types/Actions/Leaf';

export const actionsFor = (stateShape: StateTree, customReducers: Dict<LeafReducerConfig>) => {
  const paths = recursivelyGeneratePaths(stateShape)
  let actions: ActionsTree = { create: createFor(stateShape, customReducers) }

  paths.forEach(path => {
    const isPathToBranch = isBranch(R.path(path, stateShape) as ActionsLeaf | ActionsBranch)
    if (isPathToBranch) {
      actions = addActionsToBranch(actions, path, stateShape, customReducers)
    } else {
      actions = addActionsToLeaf(actions, path, stateShape, customReducers)
    }
  })

  return actions
}

const actionsForLeafOrBranch = (leafOrBranch: ActionsBranch, pathToLeafOrBranch: string[] = [], stateShape: any, customReducers: Dict<LeafReducerConfig>) => {
  if (leafOrBranch) leafOrBranch.create = createFor(stateShape, customReducers, pathToLeafOrBranch)
  return leafOrBranch
}

const addActionsToBranch = (actions: ActionsTree, path: string[], stateShape: StateTree, customReducers: Dict<LeafReducerConfig>) => {
  const branch = R.path(path, stateShape) as ActionsBranch
  return R.assocPath(path, actionsForLeafOrBranch(branch, path, stateShape, customReducers), actions)
}

const addActionsToLeaf = (actions: ActionsTree, path: string[], stateShape: StateTree, customReducers: Dict<LeafReducerConfig>) => {
  return R.assocPath(path, actionsForLeafOrBranch({} as ActionsTree, path, stateShape, customReducers), actions)
}

const createFor = (stateShape: StateTree, customReducers: Dict<LeafReducerConfig>, pathToLeafOrBranch: string[] = []) => {
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

const isBranch = (leafOrBranch: StateLeaf | StateBranch) => (
  (!Array.isArray(leafOrBranch)
    && RA.isPlainObj(leafOrBranch)
    && Object.values(leafOrBranch).length >= 1)
)

const recursivelyGeneratePaths = (stateShape: StateTree, paths: string[][] = [], currentPath: string[] = []) => {
  if (RA.isPlainObject(stateShape)) {
    Object.entries(stateShape).forEach(
      ([key, val]) => {
        const newPath = [...currentPath, key]
        paths.push(newPath)
        recursivelyGeneratePaths(val as StateBranch, paths, newPath)
      }
    )
  }
  return paths
}