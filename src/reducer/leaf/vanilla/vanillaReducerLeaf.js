import _ from 'lodash';
import { findActionRouteAndModifier } from '../../../actions/route';
import { pathJoin } from '../../../utils';
import { atomicActions } from '../../../actions/atomic';
import { insertAtIndex, replaceAtIndex } from './utils';

export const vanillaReducerLeaf = ({ prefix = "app", route, initialState = null }) => {
  return (
    state = initialState,
    action = {}
  ) => {
    const { leaf: { path, modifier }, type, payload = null, meta = null, ...rest } = action;
    
    // const { route: actionRoute, modifier } = findActionRouteAndModifier(type);
    
    const actionPath = pathJoin(path)
    const pathToLeaf = pathJoin([prefix, route])

    // CLEAR and RESET if pathToLeaf starts with actionPath
    //    (so that parent branch can clear)
    if (_.startsWith(pathToLeaf, actionPath)) {
      switch (modifier) {
        case atomicActions.CLEAR: return clear(state, payload, initialState)
        case atomicActions.RESET: return initialState
      }
    }
    // Only perform other actions when pathToLeaf is identical
    //    to actionPath
    if (pathToLeaf == actionPath) {
      switch (modifier) {
        case atomicActions.APPLY: return apply(state, action)
        case atomicActions.CONCAT: return _.concat(state, ...payload)
        case atomicActions.DROP: return drop(state, payload)
        case atomicActions.INCREMENT: return increment(state, payload)
        case atomicActions.OFF: return false
        case atomicActions.ON: return true
        case atomicActions.PUSH: return push(state, payload)
        case atomicActions.SET: return set(state, payload)
        case atomicActions.TOGGLE: return !state
        case atomicActions.UPDATE: return payload
        default: return state
      }
    }

    return state
  }
}

const apply = (state, action) => {
  const { payload } = action;
  return (typeof payload === "function")
    ? payload(_.cloneDeep(state), _.cloneDeep(action))
    : payload
}

const clear = (state, toNull, initialState) => {
  if (toNull) return null

  if (typeof initialState === "number") return 0
  if (typeof initialState === "string") return ''
  if (typeof initialState === "boolean") return false
  if (Array.isArray(initialState)) return []
  if (typeof initialState === "object") return {}

  return null
}

const drop = (state, payload) => (
  Array.isArray(state)
    ? _.drop(state, payload || 1)
    : state
)

const increment = (state, payload) => {
  const increment = (typeof payload === "number") ? payload : 1
  return state + increment
}

const push = (state, { element, index = -1, replace = false } = {}) => (
  replace
    ? replaceAtIndex(state, index, element)
    : insertAtIndex(state, index, element)
)

const set = (state, payload) => (
  _.setWith(_.clone(state), payload.path, payload.value, _.clone)
)