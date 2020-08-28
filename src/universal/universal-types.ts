import { LSAWithPayload, LeafStandardAction } from "../types"

export enum UniversalCreatorKeys {
  DO = 'DO',
  RESET = 'RESET',
  UPDATE = 'UPDATE'
}

type DoCallback<S, T> = (leafState: S, treeState: T) => S

export type UniversalCreators<S = unknown, T = unknown> = {
  do(cb: DoCallback<S, T>): LSAWithPayload<DoCallback<S, T>, UniversalCreatorKeys.DO>

  reset(): LeafStandardAction<UniversalCreatorKeys.RESET>

  update(newVal: S): LSAWithPayload<S, UniversalCreatorKeys.UPDATE>
}


export type UniversalActions<K extends keyof UniversalCreators<S, T>, S = unknown, T = unknown> = ReturnType<UniversalCreators<S, T>[K]>

export function isDoAction<S, T = unknown>(action: LeafStandardAction): action is UniversalActions<'do', S, T> {
  return action.leaf.CREATOR_KEY === UniversalCreatorKeys.DO
}

export function isResetAction(action: LeafStandardAction): action is UniversalActions<'reset'> {
  return action.leaf.CREATOR_KEY === UniversalCreatorKeys.RESET
}

export function isUpdateAction<S>(action: LeafStandardAction): action is UniversalActions<'update', S> {
  return action.leaf.CREATOR_KEY === UniversalCreatorKeys.UPDATE
}