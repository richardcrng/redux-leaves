import _ from 'lodash';
import { forArray } from './array';
import { forObject } from './object';
import { forBoolean } from './boolean';
import { forNumber } from './number';
import { forAny } from './any';
import { forString } from './string/forString';
import { makeCustomActions } from '../custom';

export const actionsFor = (stateShape, customReducers) => {
  const paths = recursivelyGeneratePaths(stateShape)
  const actions = { create: createFor(stateShape, customReducers) }

  paths.forEach(path => {
    const isPathToBranch = isBranch(_.get(stateShape, path))
    if (isPathToBranch) {
      addActionsToBranch(actions, path, stateShape, customReducers)
    } else {
      addActionsToLeaf(actions, path, stateShape, customReducers)
    }
  })
  
  return actions
}

const actionsForLeafOrBranch = (leafOrBranch, pathToLeafOrBranch = [], stateShape, customReducers) => {
  leafOrBranch.create = createFor(stateShape, customReducers, pathToLeafOrBranch)
  return leafOrBranch
}

const addActionsToBranch = (actions, path, stateShape, customReducers) => {
  const branch = _.get(stateShape, path)
  _.set(actions, path, actionsForLeafOrBranch(branch, path, stateShape, customReducers))
}

const addActionsToLeaf = (actions, path, stateShape, customReducers) => {
  _.set(actions, path, actionsForLeafOrBranch({}, path, stateShape, customReducers))
}

const createFor = (stateShape, customReducers, pathToLeafOrBranch = []) => {
  const initialState = pathToLeafOrBranch.length >= 1
    ? _.get(stateShape, pathToLeafOrBranch)
    : stateShape

  let actionCreators

  const basicActionCreators = forAny(pathToLeafOrBranch)
  const asArray = forArray(pathToLeafOrBranch)
  const asBoolean = forBoolean(pathToLeafOrBranch)
  const asNumber = forNumber(pathToLeafOrBranch)
  const asObject = forObject(pathToLeafOrBranch)
  const asString = forString(pathToLeafOrBranch)
  const custom = makeCustomActions(customReducers, pathToLeafOrBranch)

  if (_.isBoolean(initialState)) {
    actionCreators = asBoolean
  } else if (_.isArray(initialState)) {
    actionCreators = asArray
  } else if (_.isNumber(initialState)) {
    actionCreators = asNumber
  } else if (_.isPlainObject(initialState)) {
    actionCreators = asObject
  } else if (_.isString(initialState)) {
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
  (!Array.isArray(leafOrBranch) && typeof leafOrBranch === "object" && _.size(leafOrBranch) >= 1)
)

const recursivelyGeneratePaths = (stateShape, paths = [], currentPath = []) => {
  if (_.isPlainObject(stateShape)) {
    _.forEach(
      stateShape,
      (val, key) => {
        const newPath = [...currentPath, key]
        paths.push(newPath)
        recursivelyGeneratePaths(val, paths, newPath)
      }
    )
  }
  return paths
}