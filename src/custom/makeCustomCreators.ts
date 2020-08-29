import { CustomCreators } from './custom-types';
import makeCreatorOfTypeFromPath from '../create/makeCreatorOfTypeFromPath';
import { CreateFn } from '../types';

function makeCustomCreators<L, T>(leafState: L, path: (string | number)[]): CreateFn<CustomCreators<L, T>> {
  
  const makeCreatorOfType = makeCreatorOfTypeFromPath(path)

  return (passedType?: string) => {
    const creatorOfType = makeCreatorOfType(passedType)
    return {
    }
  }
}

export default makeCustomCreators