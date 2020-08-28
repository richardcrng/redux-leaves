import { LSAWithPayload, LeafStandardAction } from "../types";

export enum ObjectCreatorKeys {
  ASSIGN = 'ASSIGN',
  PATH = 'PATH'
}

export type ObjectCreators<L extends {} = {}, T = unknown> = {
  assign(props: Partial<L>): LSAWithPayload<L, ObjectCreatorKeys.ASSIGN>,
  path<V = unknown>(route: (string|number)[], value: V): LSAWithPayload<{ path: (string|number)[], value: V }, ObjectCreatorKeys.PATH>
}

export type ObjectActions<K extends keyof ObjectCreators, L = unknown, T = unknown> = ReturnType<ObjectCreators<L>[K]>

export function isAssignAction<L>(action: LeafStandardAction): action is ObjectActions<'assign', L> {
  return action.leaf.CREATOR_KEY === ObjectCreatorKeys.ASSIGN
}

export function isPathAction<L>(action: LeafStandardAction): action is ObjectActions<'path', L> {
  return action.leaf.CREATOR_KEY === ObjectCreatorKeys.PATH
}