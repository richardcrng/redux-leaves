import _ from 'lodash';
import { atomicActions } from "..";
import { makeActionCreator } from './../creator/index';

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