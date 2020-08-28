import { creatorGuards, LeafStandardAction } from "../types";
import updateState, { getState } from "../utils/update-state";
import universalLeafReducer from "./universalLeafReducer";
import arrayLeafReducer from "./arrayLeafReducer";


function leafReducer<L, T, A extends LeafStandardAction>(leafState: L, treeState: T, action: A, originalState: T): L {
  if (Array.isArray(leafState)) {
    return arrayLeafReducer(leafState, treeState, action, originalState)
  }

  return universalLeafReducer(leafState, treeState, action, originalState)
}

export default leafReducer