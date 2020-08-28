import { LSAWithPayload, LeafStandardAction } from "../types";

export enum ObjectCreatorKeys {
  ASSIGN = 'ASSIGN',
  PATH = 'PATH',
  PUSHED_SET = 'PUSHED_SET'
}

export type ObjectCreators<L extends {} = {}, T = unknown> = {
  assign(props: Partial<L>): LSAWithPayload<L, ObjectCreatorKeys.ASSIGN>,
  path<V = unknown>(route: (string|number)[], value: V): LSAWithPayload<{ path: (string|number)[], value: V }, ObjectCreatorKeys.PATH>,
  pushedSet: PushedSet<L>
}

type PushedSet<L> = PushedSetWithValue<L> | PushedSetWithCallback<L>
type PushedSetCallback<L> = (id: string) => L[keyof L]
type PushedSetWithValue<L> = (val: L[keyof L]) => LSAWithPayload<L[keyof L], ObjectCreatorKeys.PUSHED_SET>
type PushedSetWithCallback<L> = (cb: PushedSetCallback<L>) => LSAWithPayload<PushedSetCallback<L>, ObjectCreatorKeys.PUSHED_SET>

export type ObjectActions<K extends keyof ObjectCreators, L = unknown, T = unknown> = ReturnType<ObjectCreators<L>[K]>

export function isAssignAction<L>(action: LeafStandardAction): action is ObjectActions<'assign', L> {
  return action.leaf.CREATOR_KEY === ObjectCreatorKeys.ASSIGN
}

export function isPathAction<L>(action: LeafStandardAction): action is ObjectActions<'path', L> {
  return action.leaf.CREATOR_KEY === ObjectCreatorKeys.PATH
}

export function isPushedSetAction<L>(action: LeafStandardAction): action is ObjectActions<'pushedSet', L> {
  return action.leaf.CREATOR_KEY === ObjectCreatorKeys.PUSHED_SET
}

export function isPushedSetCallbackAction<L>(action: ObjectActions<'pushedSet', L>): action is ReturnType<PushedSetWithCallback<L>> {
  return typeof action.payload === 'function'
}