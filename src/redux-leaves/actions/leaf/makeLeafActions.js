import { pathJoin } from "../../utils";
import { makeActionCreator } from '../creator/';
import { atomicActions } from '../atomic/';

export const makeLeafActions = prefix => {
  return leaf => leafActions(prefix, leaf)
}

const leafActions = (path = "app/", leaf = "leaf") => {
  const leafAction = type => makeActionCreator(pathJoin([path, leaf, type]))

  return {
    clear: leafAction(atomicActions.CLEAR),
    increment: leafAction(atomicActions.INCREMENT),
    off: leafAction(atomicActions.OFF),
    on: leafAction(atomicActions.ON),
    reset: leafAction(atomicActions.RESET),
    set: leafAction(atomicActions.SET),
    update: leafAction(atomicActions.SET),
    toggle: leafAction(atomicActions.TOGGLE)
  }
}