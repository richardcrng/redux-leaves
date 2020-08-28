import { ArrayCreators, ArrayCreatorKeys, CreateFn } from "../types";
import makeCreatorOfTypeFromPath from './makeCreatorOfTypeFromPath';

function makeTypedCreators<L extends Array<unknown>>(leafState: L, path: (string | number)[]): CreateFn<ArrayCreators>

function makeTypedCreators<L extends any>(leafState: L, path: (string | number)[]): CreateFn<{}>

function makeTypedCreators<L>(leafState: L, path: (string | number)[]): CreateFn<any> {
  const makeCreatorOfType = makeCreatorOfTypeFromPath(path)

  // Array leafState
  if (Array.isArray(leafState)) {
    const makeArrayCreators = (passedType?: string): ArrayCreators => {
      const creatorOfType = makeCreatorOfType(passedType)
      return {
        drop: (n) => creatorOfType(ArrayCreatorKeys.DROP, n)
      }
    }

    return makeArrayCreators
  }

  return (_?: string) => ({})
}

export default makeTypedCreators