import { isStringConcatAction } from './string-types'
import { LeafStandardAction, isClearAction } from "../types"
import universalLeafReducer from '../universal/universalLeafReducer';

function stringLeafReducer<L extends string, T, A extends LeafStandardAction>(leafState: L, treeState: T, action: A, originalState: T): L {

  if (isClearAction(action)) {
    return '' as L
  }
  
  if (isStringConcatAction(action)) {
    return leafState.concat(action.payload) as L
  }

  return universalLeafReducer(leafState, treeState, action, originalState)
}

export default stringLeafReducer