import { ActionWithPayload, Action } from "../types"

export enum UniversalCreatorKeys {
  CLEAR = 'CLEAR',
  DO = 'DO',
  RESET = 'RESET',
  UPDATE = 'UPDATE'
}

type DoCallback<L, T> = (leafState: L, treeState: T) => L

export type UniversalCreators<
  LeafT = unknown,
  TreeT = unknown
> = {
  clear(): Action

  do(cb: DoCallback<LeafT, TreeT>): ActionWithPayload<DoCallback<LeafT, TreeT>>

  reset(): Action

  update(newVal: LeafT): ActionWithPayload<LeafT>
}

export type UniversalActions<
  KeyT extends keyof UniversalCreators<LeafT, TreeT>,
  LeafT = unknown,
  TreeT = unknown
> = ReturnType<UniversalCreators<LeafT, TreeT>[KeyT]>

export function isClearAction<L>(action: Action): action is UniversalActions<'clear', L> {
  return action.leaf.CREATOR_KEY === UniversalCreatorKeys.CLEAR
}

export function isDoAction<L, T = unknown>(action: Action): action is UniversalActions<'do', L, T> {
  return action.leaf.CREATOR_KEY === UniversalCreatorKeys.DO
}

export function isResetAction(action: Action): action is UniversalActions<'reset'> {
  return action.leaf.CREATOR_KEY === UniversalCreatorKeys.RESET
}

export function isUpdateAction<L>(action: Action): action is UniversalActions<'update', L> {
  return action.leaf.CREATOR_KEY === UniversalCreatorKeys.UPDATE
}