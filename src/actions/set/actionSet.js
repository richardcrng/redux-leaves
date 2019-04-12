import _ from 'lodash';
import { makeActionCreator } from '../creator/index';
import { pathJoin } from '../../utils';
import { atomicActions } from '../atomic';

const standardActionSet = (path = "app/", slice = "slice") => {
  const makeActionCreatorOfType = type => (
    makeActionCreator(`${path}${slice}/${type}`)
  )

  return {
    clear: makeActionCreatorOfType(atomicActions.CLEAR),
    increment: makeActionCreatorOfType(atomicActions.INCREMENT),
    off: makeActionCreatorOfType(atomicActions.OFF),
    on: makeActionCreatorOfType(atomicActions.ON),
    reset: makeActionCreatorOfType(atomicActions.RESET),
    set: makeActionCreatorOfType(atomicActions.SET),
    toggle: makeActionCreatorOfType(atomicActions.TOGGLE)
  }
}

export const actionSet = _.curry(standardActionSet)

export const withActions = (reducer, path) => {
  const leafAction = type => makeActionCreator(pathJoin([path, type]))

  reducer.apply = leafAction(atomicActions.APPLY)
  reducer.clear = leafAction(atomicActions.CLEAR)
  reducer.drop = leafAction(atomicActions.DROP)
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