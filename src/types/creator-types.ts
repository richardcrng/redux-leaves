import { ArrayCreators } from '../array/array-types'
import { UniversalCreators } from '../universal/universal-types'
import { StringCreators } from '../string/string-types'
import { ObjectCreators } from '../object/object-types'
import { NumberCreators } from '../number/number-types'
import { BooleanCreators } from '../boolean/boolean-types'
import { CustomReducers, CustomCreators } from '../custom/custom-types'

export * from '../universal/universal-types'
export * from '../custom/custom-types'

export type CreateFn<T> = (passedType?: string) => T

export type WrappedWithCreate<T, C> = T & { create: CreateFn<C> }

export type CreateAPI<
  LeafT,
  TreeT,
  CustomReducersT extends CustomReducers<TreeT>
> = DefaultCreators<LeafT, TreeT, CustomReducersT> & CreateFn<DefaultCreators<LeafT, TreeT, CustomReducersT>>

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

export type DefaultCreators<
  LeafT,
  TreeT,
  CustomReducersT extends CustomReducers<TreeT>
> =
  UniversalCreators<LeafT, TreeT>
    & TypedCreators<LeafT, TreeT>
    & CustomCreators<LeafT, TreeT, CustomReducersT>


