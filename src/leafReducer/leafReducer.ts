import { isPlainObject } from "ramda-adjunct";
import { Action, isCustomAction, CustomReducers, isLonghandReducer } from "../types";
import universalLeafReducer from "../universal/universalLeafReducer";
import arrayLeafReducer from "../array/arrayLeafReducer";
import stringLeafReducer from "../string/stringLeafReducer";
import objectLeafReducer from '../object/objectLeafReducer';
import numberLeafReducer from "../number/numberLeafReducer";
import booleanLeafReducer from "../boolean/booleanLeafReducer";

function leafReducer<
  LeafT,
  TreeT,
  ActionT extends Action,
  CustomReducersT extends CustomReducers<TreeT>
>(
  leafState: LeafT,
  treeState: TreeT,
  action: ActionT,
  originalState: TreeT,
  reducersDict: CustomReducersT
): LeafT {

  if (isCustomAction(action)) {

    const {
      [action.leaf.creatorKey]: matchingDefinition
    } = reducersDict

    if (matchingDefinition) {
      return isLonghandReducer(matchingDefinition)
        ? matchingDefinition.reducer(leafState, action, treeState)
        : matchingDefinition(leafState, action, treeState)
    } else {
      return leafState
    }
  }

  if (Array.isArray(leafState)) {
    return arrayLeafReducer(leafState, treeState, action, originalState)
  }

  if (typeof leafState === 'string') {
    return stringLeafReducer(leafState, treeState, action, originalState)
  }

  if (typeof leafState === 'number') {
    return numberLeafReducer(leafState, treeState, action, originalState)
  }

  if (typeof leafState === 'boolean') {
    return booleanLeafReducer(leafState, treeState, action, originalState)
  }

  if (isPlainObject(leafState)) {
    return objectLeafReducer(leafState, treeState, action, originalState)
  }

  return universalLeafReducer(leafState, treeState, action, originalState)
}

export default leafReducer