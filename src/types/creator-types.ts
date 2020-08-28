import { ArrayCreators } from '../array/array-types'
import { UniversalCreators } from '../universal/universal-types'

export * from '../array/array-types'
export * from '../universal/universal-types'

export type CreateFn<T> = (passedType?: string) => T

export type TypedCreators<S, T> = S extends Array<unknown> ? ArrayCreators<S, T> : {}

export type DefaultCreators<S, T> = UniversalCreators<S, T> & TypedCreators<S, T>


