import { LSAWithPayload, LeafStandardAction } from "./action-types"

export enum UniversalCreatorKeys {
  DO = 'DO',
  RESET = 'RESET',
  UPDATE = 'UPDATE'
}

export enum ArrayCreatorKeys {
  DROP = 'DROP'
}

export type CreateFn<T> = (passedType?: string) => T

export type CreateDefaults<S, T> = UniversalCreators<S, T>

type DoCallback<S, T> = (leafState: S, treeState: T) => S

export type UniversalCreators<S = unknown, T = unknown> = {
  do(cb: DoCallback<S, T>): LSAWithPayload<DoCallback<S, T>, UniversalCreatorKeys.DO>

  reset(): LeafStandardAction<UniversalCreatorKeys.RESET>

  update(newVal: S): LSAWithPayload<S, UniversalCreatorKeys.UPDATE>
}

interface TypedCreators {
  [creatorKey: string]: (...args: any) => any
}

export type ArrayCreators<S = unknown, T = unknown> = {
  drop(n ?: number): LSAWithPayload<number | undefined, ArrayCreatorKeys.DROP>
}

export type CreatedAction<C extends TypedCreators, K extends keyof C, S = unknown, T = unknown> = ReturnType<C[K]>

export type UniversalActions<K extends keyof UniversalCreators<S, T>, S = unknown, T = unknown> = ReturnType<UniversalCreators<S, T>[K]>

export type ArrayActions<K extends keyof ArrayCreators> = ReturnType<ArrayCreators[K]>

