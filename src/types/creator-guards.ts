import { LeafStandardAction } from "./action-types"
import { StandardActions, DefaultCreators } from "./creator-types"

export function isDoAction<S, T = unknown>(action: LeafStandardAction): action is StandardActions<S, T, 'do'> {
  return action.leaf.CREATOR_KEY === DefaultCreators.DO
}

export function isUpdateAction<S, T = unknown>(action: LeafStandardAction): action is StandardActions<S, T, 'update'> {
  return action.leaf.CREATOR_KEY === DefaultCreators.UPDATE
}