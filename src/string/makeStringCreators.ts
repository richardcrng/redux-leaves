import makeCreatorOfTypeFromPath from '../create/makeCreatorOfTypeFromPath';
import { CreateFn } from '../types';
import { StringCreators, StringCreatorKeys } from './string-types';

function makeStringCreators<L extends string, T>(leafState: L, path: (string | number)[]): CreateFn<StringCreators<L, T>> {
  const makeCreatorOfType = makeCreatorOfTypeFromPath(path)
  return (passedType?: string) => {
    const creatorOfType = makeCreatorOfType(passedType)
    return {
      concat: (n) => creatorOfType(StringCreatorKeys.CONCAT, n)
    }
  }
}

export default makeStringCreators