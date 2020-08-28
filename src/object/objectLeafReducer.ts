import { LeafStandardAction, isClearAction } from "../types"
import universalLeafReducer from '../universal/universalLeafReducer';
import { isAssignAction, isPathAction } from './object-types';
import updateState from "../utils/update-state";

function objectLeafReducer<L extends {}, T, A extends LeafStandardAction>(leafState: L, treeState: T, action: A, originalState: T): L {
  if (isAssignAction<L>(action)) {
    return {
      ...leafState,
      ...action.payload
    }
  }

  if (isPathAction(action)) {
    return updateState(leafState, action.payload.path, action.payload.value)
  }

  if (isClearAction(action)) {
    return {} as L
  }


  return universalLeafReducer(leafState, treeState, action, originalState)
}

export default objectLeafReducer