import _ from 'lodash';
import { forArray } from './forArray';
import { forObject } from './forObject';
import { forBoolean } from './forBoolean';
import { forNumber } from './forNumber/forNumber';
import { forAny } from './forAny';

export const actionsFor = (stateShape) => {
  const paths = recursivelyGeneratePaths(stateShape)
  const actions = {}
  paths.forEach(path => {
    const isPathToBranch = isBranch(_.get(stateShape, path))
    if (isPathToBranch) {
      addActionsToBranch(actions, path, stateShape)
    } else {
      addActionsToLeaf(actions, path, stateShape)
    }
  })
  return actions
}

const actionsForLeafOrBranch = (leafOrBranch, pathToLeafOrBranch = [], stateShape) => {
  const initialState = _.get(stateShape, pathToLeafOrBranch)
  let actionCreators

  const basicActionCreators = forAny(pathToLeafOrBranch)
  const asArray = forArray(pathToLeafOrBranch)
  const asBoolean = forBoolean(pathToLeafOrBranch)
  const asNumber = forNumber(pathToLeafOrBranch)
  const asObject = forObject(pathToLeafOrBranch)

  if (_.isBoolean(initialState)) {
    actionCreators = asBoolean
  } else if (_.isArray(initialState)) {
    actionCreators = asArray
  } else if (_.isNumber(initialState)) {
    actionCreators = asNumber
  } else if (_.isPlainObject(initialState)) {
    actionCreators = asObject
  }

  leafOrBranch.create = {
    ...basicActionCreators,
    ...actionCreators,
    asArray,
    asBoolean,
    asNumber,
    asObject
  }

  return leafOrBranch
}

const addActionsToBranch = (actions, path, stateShape) => {
  const branch = _.get(stateShape, path)
  _.set(actions, path, actionsForLeafOrBranch(branch, path, stateShape))
}

const addActionsToLeaf = (actions, path, stateShape) => {
  _.set(actions, path, actionsForLeafOrBranch({}, path, stateShape))
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