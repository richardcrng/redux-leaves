import { LeafStandardAction, isClearAction } from "../types"
import universalLeafReducer from '../universal/universalLeafReducer';
import { isAssignAction } from './object-types';

function objectLeafReducer<L extends {}, T, A extends LeafStandardAction>(leafState: L, treeState: T, action: A, originalState: T): L {

  if (isClearAction(action)) {
    return {} as L
  }
  
  if (isAssignAction<L>(action)) {
    return {
      ...leafState,
      ...action.payload
    }
  }

  return universalLeafReducer(leafState, treeState, action, originalState)
}

export default objectLeafReducer