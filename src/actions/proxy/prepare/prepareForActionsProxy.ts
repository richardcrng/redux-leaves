import * as R from 'ramda'
import * as RA from 'ramda-adjunct'
import Dict from '../../../types/Dict'
import { setValue } from '../../../utils/update-state';
import objectMap from '../../../utils/objectMap';


function prepareForActionsProxy<S extends Dict<any> = Dict<any>>(stateShape: S) {
  const paths = recursivelyGeneratePaths(stateShape)
  const actions = R.clone(stateShape)
  paths.forEach(path => {
    const val = R.path(path, stateShape)
    if (!(typeof val === 'object')) {
      setValue(actions, path, {})
    }
  })

  return actions
}

// @ts-ignore
const recursivelyMapToObjects = (leafOrBranch: any) => {
  if (RA.isArrayLike(leafOrBranch)) {
    return leafOrBranch.map(recursivelyMapToObjects)
  } else if (RA.isPlainObj(leafOrBranch)) {
    return objectMap(
      ([key, val]) => [key, recursivelyMapToObjects(val)],
      leafOrBranch
    )
  } else {
    return {}
  }
}

const recursivelyGeneratePaths = (stateShape: object, paths: string[][] = [], currentPath: string[] = []) => {
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

export default prepareForActionsProxy