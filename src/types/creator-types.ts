import { ArrayCreators } from '../array/array-types'
import { UniversalCreators } from '../universal/universal-types'
import { StringCreators } from '../string/string-types'
import { ObjectCreators } from '../object/object-types'
import { NumberCreators } from '../number/number-types'
import { BooleanCreators } from '../boolean/boolean-types'

export * from '../universal/universal-types'

export type CreateFn<T> = (passedType?: string) => T

export type WrappedWithCreate<T, C> = T & { create: CreateFn<C> }

export type TypedCreators<LeafT, TreeT> =
  LeafT extends Array<unknown>
    ? ArrayCreators<LeafT, TreeT> :
  LeafT extends number
    ? NumberCreators<LeafT, TreeT> :
  LeafT extends string
    ? StringCreators<LeafT, TreeT> :
  LeafT extends boolean
    ? BooleanCreators<LeafT, TreeT> :
  LeafT extends {}
    ? ObjectCreators<LeafT, TreeT> :
  {}

export type DefaultCreators<LeafT, TreeT> = UniversalCreators<LeafT, TreeT> & TypedCreators<LeafT, TreeT>


