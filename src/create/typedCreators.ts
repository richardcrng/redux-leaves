import { ArrayCreators, ArrayCreatorKeys, CreateFn } from "../types";
import makeCreatorOfTypeFromPath from './makeCreatorOfTypeFromPath';

function typedCreators<L extends Array<unknown>>(leafState: L, path: (string | number)[]): CreateFn<ArrayCreators>

function typedCreators<L>(leafState: L, path: (string | number)[]): any {
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
}

export default typedCreators