import { LSAWithPayload, LeafStandardAction } from "./action-types"
export * from '../array/array-types'
export * from '../universal/universal-types'

export type CreateFn<T> = (passedType?: string) => T

interface TypedCreators {
  [creatorKey: string]: (...args: any) => any
}

export type CreatedAction<C extends TypedCreators, K extends keyof C, S = unknown, T = unknown> = ReturnType<C[K]>


