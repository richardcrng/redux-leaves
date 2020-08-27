import { creatorGuards, LeafStandardAction } from "../types";
import updateState from "../utils/update-state";


function leafReducer<L, T, A extends LeafStandardAction>(leafState: L, treeState: T, action: A): L {
  if (creatorGuards.isUpdateAction<L>(action)) {
    return action.payload
  }

  if (creatorGuards.isDoAction<L, T>(action)) {
    return action.payload(leafState, treeState)
  }

  return leafState
}

export default leafReducer