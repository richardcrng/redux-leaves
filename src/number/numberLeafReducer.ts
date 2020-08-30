import { defaultTo } from "ramda";
import { LeafStandardAction, isClearAction } from "../types"
import universalLeafReducer from '../universal/universalLeafReducer';
import { isIncrementAction } from "./number-types";

function numberLeafReducer<L extends number, T, A extends LeafStandardAction>(leafState: L, treeState: T, action: A, originalState: T): L {

  if (isIncrementAction(action)) {
    return leafState + defaultTo(1, action.payload) as L
  }

  if (isClearAction(action)) {
    return 0 as L
  }

  return universalLeafReducer(leafState, treeState, action, originalState)
}

export default numberLeafReducer