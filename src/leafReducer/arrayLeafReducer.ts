import { drop, defaultTo } from 'ramda';

import { LeafStandardAction, creatorGuards } from "../types"
import universalLeafReducer from './universalLeafReducer';

function arrayLeafReducer<L extends Array<E>, T, A extends LeafStandardAction, E = unknown>(leafState: L, treeState: T, action: A, originalState: T): L {
  
  if (creatorGuards.isDropAction(action)) {
    return drop(defaultTo(1, action.payload), leafState) as L
  }

  return universalLeafReducer(leafState, treeState, action, originalState)
}

export default arrayLeafReducer