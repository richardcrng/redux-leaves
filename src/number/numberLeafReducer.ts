import { LeafStandardAction, isClearAction } from "../types"
import universalLeafReducer from '../universal/universalLeafReducer';

function numberLeafReducer<L extends number, T, A extends LeafStandardAction>(leafState: L, treeState: T, action: A, originalState: T): L {

  if (isClearAction(action)) {
    return 0 as L
  }

  return universalLeafReducer(leafState, treeState, action, originalState)
}

export default numberLeafReducer