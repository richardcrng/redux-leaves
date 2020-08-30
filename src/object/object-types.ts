import { ActionWithPayload, Action } from "../types";

export enum ObjectCreatorKeys {
  ASSIGN = 'ASSIGN',
  PATH = 'PATH',
  PUSHED_SET = 'PUSHED_SET',
  SET = 'SET'
}

export type ObjectCreators<
  LeafT extends {} = {},
  TtreeT = unknown
> = {
  assign(props: Partial<LeafT>): ActionWithPayload<LeafT>,
  path<V = unknown>(route: (string|number)[], value: V): ActionWithPayload<{ path: (string|number)[], value: V }>,
  pushedSet: PushedSet<LeafT>,
  set<KeyT extends keyof LeafT>(key: KeyT, value: LeafT[KeyT]): ActionWithPayload<{ key: KeyT, value: LeafT[KeyT] }>
}

type PushedSet<L> = (arg: L[keyof L] | PushedSetCallback<L>) => ActionWithPayload<L[keyof L] | PushedSetCallback<L>>

type PushedSetCallback<L> = (id: string) => L[keyof L]
type PushedSetWithValue<L> = (val: L[keyof L]) => ActionWithPayload<L[keyof L]>
type PushedSetWithCallback<L> = (cb: PushedSetCallback<L>) => ActionWithPayload<PushedSetCallback<L>>

export type ObjectActions<
  KeyT extends keyof ObjectCreators,
  LeafT = unknown,
  TreeT = unknown
> = ReturnType<ObjectCreators<LeafT, TreeT>[KeyT]>

export function isAssignAction<L>(action: Action): action is ObjectActions<'assign', L> {
  return action.leaf.CREATOR_KEY === ObjectCreatorKeys.ASSIGN
}

export function isPathAction<L>(action: Action): action is ObjectActions<'path', L> {
  return action.leaf.CREATOR_KEY === ObjectCreatorKeys.PATH
}

export function isPushedSetAction<L>(action: Action): action is ObjectActions<'pushedSet', L> {
  return action.leaf.CREATOR_KEY === ObjectCreatorKeys.PUSHED_SET
}

export function isPushedSetValueAction<L>(action: Action): action is ReturnType<PushedSetWithValue<L>> {
  return isPushedSetAction(action)
    && typeof action.payload !== 'function'
}

export function isPushedSetCallbackAction<L>(action: Action): action is ReturnType<PushedSetWithCallback<L>> {
  return isPushedSetAction(action)
    && typeof action.payload === 'function'
}

export function isSetAction<L>(action: Action): action is ObjectActions<'set', L> {
  return action.leaf.CREATOR_KEY === ObjectCreatorKeys.SET
}