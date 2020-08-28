import { LSAWithPayload, LeafStandardAction } from "../types"
import { isNotUndefined } from "ramda-adjunct"

const makeCreatorOfTypeFromPath = (path: (string | number)[]) => (passedType?: string) => {
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

export default makeCreatorOfTypeFromPath