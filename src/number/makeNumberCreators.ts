import makeCreatorOfTypeFromPath from '../create/makeCreatorOfTypeFromPath';
import { CreateFn } from '../types';
import { NumberCreators, NumberCreatorKeys } from './number-types';

function makeNumberCreators<L extends number, T>(leafState: L, path: (string | number)[]): CreateFn<NumberCreators<L, T>> {
  const makeCreatorOfType = makeCreatorOfTypeFromPath(path)
  return (passedType?: string) => {
    const creatorOfType = makeCreatorOfType(passedType)
    return {
      // assign: (props: L) => creatorOfType(NumberCreatorKeys.ASSIGN, props)
    }
  }
}

export default makeNumberCreators