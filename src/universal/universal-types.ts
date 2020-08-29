import { LSAwP, LSA } from "../types"

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
  clear(): LSA<UniversalCreatorKeys.CLEAR>

  do(cb: DoCallback<LeafT, TreeT>): LSAwP<DoCallback<LeafT, TreeT>, UniversalCreatorKeys.DO>

  reset(): LSA<UniversalCreatorKeys.RESET>

  update(newVal: LeafT): LSAwP<LeafT, UniversalCreatorKeys.UPDATE>
}

export type UniversalActions<
  KeyT extends keyof UniversalCreators<LeafT, TreeT>,
  LeafT = unknown,
  TreeT = unknown
> = ReturnType<UniversalCreators<LeafT, TreeT>[KeyT]>

export function isClearAction<L>(action: LSA): action is UniversalActions<'clear', L> {
  return action.leaf.CREATOR_KEY === UniversalCreatorKeys.CLEAR
}

export function isDoAction<L, T = unknown>(action: LSA): action is UniversalActions<'do', L, T> {
  return action.leaf.CREATOR_KEY === UniversalCreatorKeys.DO
}

export function isResetAction(action: LSA): action is UniversalActions<'reset'> {
  return action.leaf.CREATOR_KEY === UniversalCreatorKeys.RESET
}

export function isUpdateAction<L>(action: LSA): action is UniversalActions<'update', L> {
  return action.leaf.CREATOR_KEY === UniversalCreatorKeys.UPDATE
}