import _ from 'lodash';
import { findActionRouteAndModifier } from '../../../actions/route';
import { pathJoin } from '../../../utils';
import { atomicActions } from '../../../actions/atomic';

export const vanillaReducerLeaf = ({ prefix = "app", route, initialState }) => {
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