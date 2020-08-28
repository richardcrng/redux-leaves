import { ArrayCreators } from '../array/array-types'
import { UniversalCreators } from '../universal/universal-types'
import { StringCreators } from '../string/string-types'
import { ObjectCreators } from '../object/object-types'
import { NumberCreators } from '../number/number-types'
import { BooleanCreators } from '../boolean/boolean-types'

export * from '../array/array-types'
export * from '../universal/universal-types'

export type CreateFn<T> = (passedType?: string) => T

export type TypedCreators<S, T> =
  S extends Array<unknown>
    ? ArrayCreators<S, T> :
  S extends number
    ? NumberCreators<S, T> :
  S extends string
    ? StringCreators<S, T> :
  S extends boolean
    ? BooleanCreators<S, T> :
  S extends {}
    ? ObjectCreators<S, T> :
  {}

export type DefaultCreators<S, T> = UniversalCreators<S, T> & TypedCreators<S, T>


