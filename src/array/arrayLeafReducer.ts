import { drop, defaultTo } from 'ramda';
import { isDropAction, isConcatActionArray, isFilterAction } from './array-types'
import { LeafStandardAction, isClearAction } from "../types"
import universalLeafReducer from '../universal/universalLeafReducer';

function arrayLeafReducer<L extends unknown[], T, A extends LeafStandardAction>(leafState: L, treeState: T, action: A, originalState: T): L {
  
  if (isDropAction(action)) {
    return drop(defaultTo(1, action.payload), leafState) as L
  }

  if (isConcatActionArray<L>(action)) {
    return [...leafState, ...action.payload] as L
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