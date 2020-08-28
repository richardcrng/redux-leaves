import { LeafStandardAction } from "./action-types"
import { UniversalActions, UniversalCreatorKeys, ArrayActions, ArrayCreatorKeys, CreatedAction, UniversalCreators, ArrayCreators } from "./creator-types"

export function isDoAction<S, T = unknown>(action: LeafStandardAction): action is CreatedAction<UniversalCreators<S, T>, 'do', S, T> {
  return action.leaf.CREATOR_KEY === UniversalCreatorKeys.DO
}

export function isDropAction(action: LeafStandardAction): action is CreatedAction<ArrayCreators, 'drop'> {
  return action.leaf.CREATOR_KEY === ArrayCreatorKeys.DROP
}

export function isResetAction(action: LeafStandardAction): action is CreatedAction<UniversalCreators, 'reset'> {
  return action.leaf.CREATOR_KEY === UniversalCreatorKeys.RESET
}

export function isUpdateAction<S>(action: LeafStandardAction): action is CreatedAction<UniversalCreators<S>, 'update', S> {
  return action.leaf.CREATOR_KEY === UniversalCreatorKeys.UPDATE
}