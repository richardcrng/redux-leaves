import { LSAWithPayload, LeafStandardAction } from "../types";

export enum ObjectCreatorKeys {
  ASSIGN = 'ASSIGN'
}

export type ObjectCreators<L extends {} = {}, T = unknown> = {
  assign(props: Partial<L>): LSAWithPayload<L, ObjectCreatorKeys.ASSIGN>
}

export type ObjectActions<K extends keyof ObjectCreators, L = unknown, T = unknown> = ReturnType<ObjectCreators<L>[K]>

export function isAssignAction<L>(action: LeafStandardAction): action is ObjectActions<'assign', L> {
  return action.leaf.CREATOR_KEY === ObjectCreatorKeys.ASSIGN
}