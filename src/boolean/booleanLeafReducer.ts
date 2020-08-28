import { LeafStandardAction, isClearAction } from "../types"
import universalLeafReducer from '../universal/universalLeafReducer';

function booleanLeafReducer<L extends boolean, T, A extends LeafStandardAction>(leafState: L, treeState: T, action: A, originalState: T): L {

  if (isClearAction(action)) {
    return false as L
  }

  return universalLeafReducer(leafState, treeState, action, originalState)
}

export default booleanLeafReducer