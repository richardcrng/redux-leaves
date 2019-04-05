import _ from 'lodash';
import { pathJoin } from '../../utils';
import { atomicActions } from '../../actions/atomic/index';
import { makeActionCreator } from '../../actions/creator/index';

export const findActionRouteAndModifier = (pathWithActionString = "example/CLEAR", metaPath = "", separator = '/') => {
  const arr = pathWithActionString.split(separator)
  // Remove empty strings, e.g. if we've split "/example/CLEAR/"
  let compacted = _.compact(arr)
  // Pop off the last element - this is the modifier
  const modifier = compacted.pop()
  // Push meta path modifier which action might have
  if (metaPath) compacted = compacted.concat(_.compact(metaPath.split(separator)))
  return {
    route: compacted,
    modifier
  }
}

export const makeReducerLeaf = (prefix, initialState) => {
  return (...route) => {
    return reducerLeaf({
      prefix,
      route,
      initialState: route.length === 0
        ? initialState
        : _.get(initialState, route.join('.'), null)
    })
  }
}

const reducerLeaf = ({ prefix = "app", route, initialState }) => {
  const reducer = vanillaReducerLeaf({ prefix, route, initialState })
  return withActions(reducer, { prefix, route })
}

const withActions = (reducer, { prefix, route }) => {
  const leafAction = type => makeActionCreator(pathJoin([prefix, route, type]))

  reducer.clear = leafAction(atomicActions.CLEAR)
  reducer.increment = leafAction(atomicActions.INCREMENT)
  reducer.off = leafAction(atomicActions.OFF)
  reducer.on = leafAction(atomicActions.ON)
  reducer.reset = leafAction(atomicActions.RESET)
  reducer.set = leafAction(atomicActions.SET)
  reducer.update = leafAction(atomicActions.SET)
  reducer.toggle = leafAction(atomicActions.TOGGLE)

  return reducer
}

const vanillaReducerLeaf = ({ prefix = "app", route, initialState }) => {
  return (
    state = initialState,
    { type, payload = null, meta = null } = {}
  ) => {

    const dropPrefixFromType = _.replace(type, prefix, '')
    const { route: actionRoute, modifier } = findActionRouteAndModifier(dropPrefixFromType, meta);

    const actionPath = pathJoin([prefix, actionRoute])
    const pathToLeaf = pathJoin([prefix, route])

    // CLEAR and RESET if pathToLeaf starts with actionPath
    //    (so that parent branch can clear)
    if (_.startsWith(pathToLeaf, actionPath)) {
      switch (modifier) {
        case atomicActions.CLEAR: return null
        case atomicActions.RESET: return initialState
      }
    }

    // Only perform other actions when pathToLeaf is identical
    //    to actionPath
    if (pathToLeaf == actionPath) {
      switch (modifier) {
        case atomicActions.INCREMENT:
          const increment = (typeof payload === "number") ? payload : 1
          return state + increment
        case atomicActions.OFF:
          return false
        case atomicActions.ON:
          return true
        case atomicActions.SET:
          return payload
        case atomicActions.TOGGLE:
          return !state
        default:
          return state
      }
    }

    return state
  }
}