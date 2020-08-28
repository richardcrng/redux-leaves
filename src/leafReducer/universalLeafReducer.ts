import { creatorGuards, LeafStandardAction } from "../types";
import { getState } from "../utils/update-state";


function universalLeafReducer<L, T, A extends LeafStandardAction>(leafState: L, treeState: T, action: A, originalState: T): L {
  if (creatorGuards.isDoAction<L, T>(action)) {
    return action.payload(leafState, treeState)
  }

  if (creatorGuards.isUpdateAction<L>(action)) {
    return action.payload
  }

  if (creatorGuards.isResetAction(action)) {
    return getState(originalState, action.leaf.path) as L
  }


  return leafState
}

export default universalLeafReducer