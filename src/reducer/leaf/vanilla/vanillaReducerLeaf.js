import _ from 'lodash';
import { findActionRouteAndModifier } from '../../../actions/route';
import { pathJoin } from '../../../utils';
import { atomicActions } from '../../../actions/atomic';

export const vanillaReducerLeaf = ({ prefix = "app", route, initialState = null }) => {
  return (
    state = initialState,
    action = {}
  ) => {
    const { type, payload = null, meta = null, ...rest } = action;
    
    const { route: actionRoute, modifier } = findActionRouteAndModifier(type, meta);
    
    const actionPath = pathJoin(actionRoute)
    const pathToLeaf = pathJoin([prefix, route])

    // CLEAR and RESET if pathToLeaf starts with actionPath
    //    (so that parent branch can clear)
    if (_.startsWith(pathToLeaf, actionPath)) {
      switch (modifier) {
        case atomicActions.CLEAR: return null
        case atomicActions.RESET: return initialState
      }
    }


    // SET a property within an object by meta,
    //    iff it has 
    if (_.startsWith(actionPath, pathToLeaf)) {
      if (modifier === atomicActions.SET) {
        if (typeof state === "object") {
          return _.setWith(_.clone(state), meta, payload, _.clone)
        }
      }
    }

    // Only perform other actions when pathToLeaf is identical
    //    to actionPath
    if (pathToLeaf == actionPath) {
      switch (modifier) {
        case atomicActions.APPLY: return apply(state, action)
        case atomicActions.INCREMENT: return increment(state, payload)
        case atomicActions.OFF: return false
        case atomicActions.ON: return true
        case atomicActions.PUSH: return push(state, payload)
        case atomicActions.SET: return payload
        case atomicActions.TOGGLE: return !state
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

const increment = (state, payload) => {
  const increment = (typeof payload === "number") ? payload : 1
  return state + increment
}

const push = (state, payload) => {
  const arr = Array.isArray(state) ? [...state] : [state]
  arr.push(payload)
  return arr
}