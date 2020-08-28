import { isNotUndefined } from 'ramda-adjunct'
import { CreateDefaults, LSAWithPayload, LeafStandardAction, DefaultCreators } from "../types"

function wrapWithCreate<S, T>(
  state: S,
  path: (string | number)[] = []
) {

  const makeCreators = (passedType?: string): CreateDefaults<S, T> => {
    const makeType = passedType
      ? (_: string) => passedType
      : (str: string) => [...path, str].join('/')

    function creatorOfType<T>(str: string, payload: T): LSAWithPayload<T>
    function creatorOfType(str: string): LeafStandardAction
    function creatorOfType<T>(str: string, payload?: T) {
      return {
        type: makeType(str),
        leaf: { path, CREATOR_KEY: str.toUpperCase(), creatorKey: str.toLowerCase() },
        ...isNotUndefined(payload) ? { payload } : {}
      }
    }

    return {
      do: (cb) => creatorOfType(DefaultCreators.DO, cb),
      reset: () => creatorOfType(DefaultCreators.RESET),
      update: (newVal: S) => creatorOfType(DefaultCreators.UPDATE, newVal)
    }
  }

  const create = Object.assign(makeCreators, makeCreators())

  return Object.assign({ create }, state)
}

export default wrapWithCreate