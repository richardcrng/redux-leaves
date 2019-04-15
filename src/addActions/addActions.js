import _ from 'lodash';
import { atomicActions } from '../actions/atomic';
import { forArray } from './forArray/';
import { forObject } from './forObject/';
import { forBoolean } from './forBoolean/';
import { forNumber } from './forNumber/forNumber';

// export const recursivelyAddActions = (leafOrBranch, path = []) => {
//   if (isBranch(leafOrBranch)) {
//     return _.mapValues(
//       addActions(leafOrBranch),
//       (val, key) => recursivelyAddActions(val, [...path, key])
//     )
//   } else {
//     return addActions({}, path)
//   }
// }

export const addActionsDeep = (stateShape, paths) => {
  const actions = {}
  paths.forEach(path => {
    const isPathToBranch = isBranch(_.get(stateShape, path))
    if (isPathToBranch) {
      _.set(actions, path, addActions(_.get(stateShape, path), path))
    } else {
      _.set(actions, path, addActions({}, path))
    }
  })
  return actions
}

export const recursivelyGeneratePaths = (stateShape, paths = [], currentPath = []) => {
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

const addActions = (leafOrBranch, pathToLeafOrBranch = []) => {
  const actionTemplate = (type, payload) => ({
    leaf: {
      path: pathToLeafOrBranch,
      modifier: type
    },
    type: [...pathToLeafOrBranch, type].join('/'),
    payload
  })

  leafOrBranch.forArray = forArray(leafOrBranch, pathToLeafOrBranch)
  leafOrBranch.forBoolean = forBoolean(leafOrBranch, pathToLeafOrBranch)
  leafOrBranch.forNumber = forNumber(leafOrBranch, pathToLeafOrBranch)
  leafOrBranch.forObject = forObject(leafOrBranch, pathToLeafOrBranch)

  leafOrBranch.apply = callback => actionTemplate(atomicActions.APPLY, callback)

  leafOrBranch.clear = (toNull = false) => actionTemplate(atomicActions.CLEAR, toNull)

  leafOrBranch.reset = () => actionTemplate(atomicActions.RESET)

  leafOrBranch.update = value => actionTemplate(atomicActions.UPDATE, value)

  return leafOrBranch
}

const isBranch = leafOrBranch => (
  (!Array.isArray(leafOrBranch) && typeof leafOrBranch === "object" && _.size(leafOrBranch) >= 1)
)