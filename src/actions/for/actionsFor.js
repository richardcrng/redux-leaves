import _ from 'lodash';
import { forArray } from './array';
import { forObject } from './object';
import { forBoolean } from './boolean';
import { forNumber } from './number';
import { forAny } from './any';
import { forString } from './string/forString';
import { makeCustomActions } from '../custom';

export const actionsFor = (stateShape, customLogic) => {
  const paths = recursivelyGeneratePaths(stateShape)
  const actions = { create: createFor(stateShape, customLogic) }

  paths.forEach(path => {
    const isPathToBranch = isBranch(_.get(stateShape, path))
    if (isPathToBranch) {
      addActionsToBranch(actions, path, stateShape, customLogic)
    } else {
      addActionsToLeaf(actions, path, stateShape, customLogic)
    }
  })
  
  return actions
}

const actionsForLeafOrBranch = (leafOrBranch, pathToLeafOrBranch = [], stateShape, customLogic) => {
  leafOrBranch.create = createFor(stateShape, customLogic, pathToLeafOrBranch)
  return leafOrBranch
}

const addActionsToBranch = (actions, path, stateShape, customLogic) => {
  const branch = _.get(stateShape, path)
  _.set(actions, path, actionsForLeafOrBranch(branch, path, stateShape, customLogic))
}

const addActionsToLeaf = (actions, path, stateShape, customLogic) => {
  _.set(actions, path, actionsForLeafOrBranch({}, path, stateShape, customLogic))
}

const createFor = (stateShape, customLogic, pathToLeafOrBranch = []) => {
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
  const custom = makeCustomActions(customLogic, pathToLeafOrBranch)

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
    custom
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