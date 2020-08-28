import { isNotUndefined } from 'ramda-adjunct'
import {
  LSAWithPayload,
  LeafStandardAction,
  UniversalCreatorKeys,
  UniversalCreators,
  ArrayCreators,
  ArrayCreatorKeys,
  CreateFn,
  DefaultCreators
} from "../types"

type WrappedWithCreate<T, C> = T & { create: CreateFn<C> }

// function wrapWithCreate<S extends Array<unknown>, T>(state: S, path?: (string | number)[]): WrappedWithCreate<S, UniversalCreators<S, T> & ArrayCreators>

function wrapWithCreate<S extends unknown, T>(state: S, path?: (string | number)[]): WrappedWithCreate<S, DefaultCreators<S, T>>

function wrapWithCreate<S, T>(
  state: S,
  path: (string | number)[] = []
): WrappedWithCreate<S, DefaultCreators<S, T>> {

  const makeCreatorOfType = (passedType?: string) => {
    const makeType = passedType
      ? (_: string) => passedType
      : (str: string) => [...path, str].join('/')

    function creatorOfType<T, K extends string = string>(str: K, payload: T): LSAWithPayload<T, K>
    function creatorOfType<T, K extends string = string>(str: K): LeafStandardAction<K>
    function creatorOfType<T, K extends string = string>(str: K, payload?: T) {
      return {
        type: makeType(str),
        leaf: { path, CREATOR_KEY: str.toUpperCase(), creatorKey: str.toLowerCase() },
        ...isNotUndefined(payload) ? { payload } : {}
      }
    }

    return creatorOfType
  }

  const makeUniversalCreators = (passedType?: string): UniversalCreators<S, T> => {
    const creatorOfType = makeCreatorOfType(passedType)
    return {
      do: (cb) => creatorOfType(UniversalCreatorKeys.DO, cb),
      reset: () => creatorOfType(UniversalCreatorKeys.RESET),
      update: (newVal: S) => creatorOfType(UniversalCreatorKeys.UPDATE, newVal)
    }
  }

  const makeArrayCreators = (passedType?: string): ArrayCreators => {
    const creatorOfType = makeCreatorOfType(passedType)
    return {
      drop: (n) => creatorOfType(ArrayCreatorKeys.DROP, n)
    }
  }

  const makeCreators = (passedType?: string) => {
    if (Array.isArray(state)) {
      const creators = Object.assign(makeUniversalCreators(passedType), makeArrayCreators(passedType))
      return creators
    }

    return makeUniversalCreators(passedType)
  }

  const create = Object.assign(makeCreators, makeCreators())

  return Object.assign({ create }, state) as unknown as WrappedWithCreate<S, DefaultCreators<S, T>>
}

export default wrapWithCreate