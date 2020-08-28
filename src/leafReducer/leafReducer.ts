import { LeafStandardAction } from "../types";
import universalLeafReducer from "../universal/universalLeafReducer";
import arrayLeafReducer from "../array/arrayLeafReducer";


function leafReducer<L, T, A extends LeafStandardAction>(leafState: L, treeState: T, action: A, originalState: T): L {
  if (Array.isArray(leafState)) {
    return arrayLeafReducer(leafState, treeState, action, originalState)
  }

  return universalLeafReducer(leafState, treeState, action, originalState)
}

export default leafReducer