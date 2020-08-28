import { LSAWithPayload, LeafStandardAction } from "../types"

export enum UniversalCreatorKeys {
  DO = 'DO',
  RESET = 'RESET',
  UPDATE = 'UPDATE'
}

type DoCallback<L, T> = (leafState: L, treeState: T) => L

export type UniversalCreators<L = unknown, T = unknown> = {
  do(cb: DoCallback<L, T>): LSAWithPayload<DoCallback<L, T>, UniversalCreatorKeys.DO>

  reset(): LeafStandardAction<UniversalCreatorKeys.RESET>

  update(newVal: L): LSAWithPayload<L, UniversalCreatorKeys.UPDATE>
}

export type UniversalActions<K extends keyof UniversalCreators<L, T>, L = unknown, T = unknown> = ReturnType<UniversalCreators<L, T>[K]>

export function isDoAction<L, T = unknown>(action: LeafStandardAction): action is UniversalActions<'do', L, T> {
  return action.leaf.CREATOR_KEY === UniversalCreatorKeys.DO
}

export function isResetAction(action: LeafStandardAction): action is UniversalActions<'reset'> {
  return action.leaf.CREATOR_KEY === UniversalCreatorKeys.RESET
}

export function isUpdateAction<L>(action: LeafStandardAction): action is UniversalActions<'update', L> {
  return action.leaf.CREATOR_KEY === UniversalCreatorKeys.UPDATE
}