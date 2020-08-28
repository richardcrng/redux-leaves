import { UniversalCreators, UniversalCreatorKeys, CreateFn } from "../types";
import makeCreatorOfTypeFromPath from '../create/makeCreatorOfTypeFromPath';

function makeUniversalCreators<L, T>(leafState: L, path: (string | number)[]): CreateFn<UniversalCreators<L, T>> {
  
  const makeCreatorOfType = makeCreatorOfTypeFromPath(path)

  return (passedType?: string) => {
    const creatorOfType = makeCreatorOfType(passedType)
    return {
      do: (cb) => creatorOfType(UniversalCreatorKeys.DO, cb),
      reset: () => creatorOfType(UniversalCreatorKeys.RESET),
      update: (newVal: L) => creatorOfType(UniversalCreatorKeys.UPDATE, newVal)
    }
  }
}

export default makeUniversalCreators