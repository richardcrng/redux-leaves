import { drop, defaultTo } from 'ramda';
import { isDropAction, isArrayConcatAction } from './array-types'
import { LeafStandardAction, isClearAction } from "../types"
import universalLeafReducer from '../universal/universalLeafReducer';

function arrayLeafReducer<L extends unknown[], T, A extends LeafStandardAction>(leafState: L, treeState: T, action: A, originalState: T): L {

  if (isClearAction(action)) {
    // @ts-ignore TODO fix
    return []
  }
  
  if (isDropAction(action)) {
    return drop(defaultTo(1, action.payload), leafState) as L
  }

  if (isArrayConcatAction<L>(action)) {
    return [...leafState, ...action.payload] as L
  }

  return universalLeafReducer(leafState, treeState, action, originalState)
}

export default arrayLeafReducer