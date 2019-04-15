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

export const withActions = (reducer, path = []) => {
  const pathWith = type => pathJoin([path, type])

  const actionTemplate = (type, payload) => ({
    leaf: {
      path: path,
      modifier: type
    },
    type: pathWith(type),
    payload
  })

  reducer.apply = callback => actionTemplate(atomicActions.APPLY, callback)

  reducer.clear = (toNull = false) => actionTemplate(atomicActions.CLEAR, toNull)

  reducer.concat = (...values) =>
    actionTemplate(atomicActions.CONCAT, values)

  reducer.drop = (n = 1) => actionTemplate(atomicActions.DROP, n)

  reducer.increment = (n = 1) => actionTemplate(atomicActions.INCREMENT, n)

  reducer.off = () => actionTemplate(atomicActions.OFF)

  reducer.on = () => actionTemplate(atomicActions.ON)

  reducer.push = (element, index = -1, replace = false) => actionTemplate(atomicActions.PUSH, { element, index, replace })

  reducer.reset = () => actionTemplate(atomicActions.RESET)

  reducer.set = (path, value) => actionTemplate(atomicActions.SET, { path, value })

  reducer.toggle = () => actionTemplate(atomicActions.TOGGLE)

  reducer.update = value => actionTemplate(atomicActions.UPDATE, value)

  return reducer
}