import { ArrayCreators } from '../array/array-types'
import { UniversalCreators } from '../universal/universal-types'
import { StringCreators } from '../string/string-types'
import { ObjectCreators } from '../object/object-types'
import { NumberCreators } from '../number/number-types'
import { BooleanCreators } from '../boolean/boolean-types'

export * from '../array/array-types'
export * from '../universal/universal-types'

export type CreateFn<T> = (passedType?: string) => T

export type WrappedWithCreate<T, C> = T & { create: CreateFn<C> }

export type TypedCreators<LeafStateT, TreeStateT> =
  LeafStateT extends Array<unknown>
    ? ArrayCreators<LeafStateT, TreeStateT> :
  LeafStateT extends number
    ? NumberCreators<LeafStateT, TreeStateT> :
  LeafStateT extends string
    ? StringCreators<LeafStateT, TreeStateT> :
  LeafStateT extends boolean
    ? BooleanCreators<LeafStateT, TreeStateT> :
  LeafStateT extends {}
    ? ObjectCreators<LeafStateT, TreeStateT> :
  {}

export type DefaultCreators<LeafStateT, TreeStateT> = UniversalCreators<LeafStateT, TreeStateT> & TypedCreators<LeafStateT, TreeStateT>


