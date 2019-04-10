import _ from 'lodash';
import { pathJoin } from '../../utils';
import { atomicActions } from '../../actions/atomic/';
import { makeActionCreator } from '../../actions/creator/';
import { vanillaReducerLeaf } from './vanilla/';


export const makeReducerLeaf = (initialState, prefix = "") => {
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

  reducer.apply = leafAction(atomicActions.APPLY)
  reducer.clear = leafAction(atomicActions.CLEAR)
  reducer.increment = leafAction(atomicActions.INCREMENT)
  reducer.off = leafAction(atomicActions.OFF)
  reducer.on = leafAction(atomicActions.ON)
  reducer.push = leafAction(atomicActions.PUSH)
  reducer.reset = leafAction(atomicActions.RESET)
  reducer.set = leafAction(atomicActions.SET)
  reducer.update = leafAction(atomicActions.SET)
  reducer.toggle = leafAction(atomicActions.TOGGLE)

  return reducer
}