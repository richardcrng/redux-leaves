import makeCreatorOfTypeFromPath from '../create/makeCreatorOfTypeFromPath';
import { ArrayCreators, CreateFn, ArrayCreatorKeys } from '../types';

function makeArrayCreators<L extends Array<unknown>, T>(leafState: L, path: (string | number)[]): CreateFn<ArrayCreators<L, T>> {
  const makeCreatorOfType = makeCreatorOfTypeFromPath(path)
  return (passedType?: string) => {
    const creatorOfType = makeCreatorOfType(passedType)
    return {
      concat: (arr: L) => creatorOfType(ArrayCreatorKeys.CONCAT, arr),
      drop: (n) => creatorOfType(ArrayCreatorKeys.DROP, n)
    }
  }
}

export default makeArrayCreators