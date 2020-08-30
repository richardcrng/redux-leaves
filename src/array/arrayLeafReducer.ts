import { drop, defaultTo } from 'ramda';
import { isDropAction, isConcatActionArray, isFilterAction, isPushAction } from './array-types'
import { Action, isClearAction } from "../types"
import universalLeafReducer from '../universal/universalLeafReducer';
import { replaceAtIndex, insertAtIndex } from '../utils/array-utils';

function arrayLeafReducer<L extends unknown[], T, A extends Action>(leafState: L, treeState: T, action: A, originalState: T): L {
  
  if (isDropAction(action)) {
    return drop(defaultTo(1, action.payload), leafState) as L
  }

  if (isConcatActionArray<L>(action)) {
    return [...leafState, ...action.payload] as L
  }

  if (isPushAction(action)) {
    const { element, index = -1, replace = false } = action.payload
    return replace
      ? replaceAtIndex(leafState, index, element) as L
      : insertAtIndex(leafState, index, element) as L
  }

  if (isFilterAction<L>(action)) {
    // @ts-ignore
    return leafState.filter(action.payload) as L
  }

  if (isClearAction(action)) {
    // @ts-ignore TODO fix
    return []
  }

  return universalLeafReducer(leafState, treeState, action, originalState)
}

export default arrayLeafReducer