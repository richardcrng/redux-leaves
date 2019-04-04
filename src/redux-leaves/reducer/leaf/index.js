import _ from 'lodash';
import { pathJoin } from '../../utils';
import { atomicActions } from '../../actions/atomic/index';
import { makeActionCreator } from '../../actions/creator/index';

export const makeReducerLeaf = (prefix, initialState) => {
  return (...route) => reducerLeaf({
    prefix,
    route,
    initialState: (typeof route === "undefined")
      ? initialState
      : _.get(initialState, route.join('.'), null)
  })
}

const reducerLeaf = ({
  prefix = "app",
  route,
  initialState
}) => {
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

const vanillaReducerLeaf = ({
  prefix = "app",
  route,
  initialState
}) => {
  return (
    state = initialState,
    { type, payload = null, meta = null } = {}
  ) => {

    if (!_.startsWith(type, prefix)) return state
    if (route && !_.startsWith(type, pathJoin([prefix, route]))) return state

    const suffix = _.replace(type, prefix, '')
    const { path, modifier } = findPathAndModifier(suffix, meta);

    switch (modifier) {
      case atomicActions.CLEAR:
        return null;
      case atomicActions.INCREMENT:
        const increment = (typeof payload === "number") ? payload : 1
        return state + increment
      case atomicActions.OFF:
        return false
      case atomicActions.ON:
        return true
      case atomicActions.RESET:
        return initialState
      case atomicActions.SET:
        return payload
      case atomicActions.TOGGLE:
        return !state
      default:
        return state
    }
  }
}

const findPathAndModifier = (trimmedType, metaPath) => {
  // Takes in something like "/list/CLEAR"
  const arr = trimmedType.split('/')
  // Remove empty strings
  const compacted = _.compact(arr)
  // Pop off the last element - this is the modifier
  const modifier = compacted.pop()
  // Push meta path modifier which action might have
  if (metaPath) compacted.push(metaPath)
  return {
    path: compacted.join('.'),
    modifier
  }
}