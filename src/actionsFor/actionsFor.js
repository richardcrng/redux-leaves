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
  const arrayActions = forArray(pathToLeafOrBranch)
  const booleanActions = forBoolean(pathToLeafOrBranch)
  const numberActions = forNumber(pathToLeafOrBranch)
  const objectActions = forObject(pathToLeafOrBranch)

  if (typeof initialState === "boolean") {
    actionCreators = booleanActions
  } else if (Array.isArray(initialState)) {
    actionCreators = arrayActions
  } else if (typeof initialState === "number") {
    actionCreators = numberActions
  } else if (_.isPlainObject(initialState)) {
    actionCreators = objectActions
  }

  leafOrBranch.create = {
    ...basicActionCreators,
    ...actionCreators
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