import { LeafStandardAction, isClearAction } from "../types"
import universalLeafReducer from '../universal/universalLeafReducer';
import { isAssignAction, isPathAction, isPushedSetAction, isPushedSetCallbackAction, isPushedSetValueAction, isSetAction } from './object-types';
import updateState from "../utils/update-state";
import generatePushID from "../utils/generatePushID";

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

  if (isPushedSetValueAction<L>(action)) {
    const id = generatePushID()
    return { ...leafState, [id]: action.payload }
  }

  if (isPushedSetCallbackAction<L>(action)) {
    const id = generatePushID()
    return { ...leafState, [id]: action.payload(id) }
  }

  if (isSetAction(action)) {
    const { key, value } = action.payload
    return { ...leafState, [key]: value }
  }

  if (isClearAction(action)) {
    return {} as L
  }


  return universalLeafReducer(leafState, treeState, action, originalState)
}

export default objectLeafReducer