import { CustomCreators } from './custom-types';
import makeCreatorOfTypeFromPath from '../create/makeCreatorOfTypeFromPath';
import { CreateFn } from '../types';

function makeCustomCreators<LeafT, TreeT>(
  leafState: LeafT,
  path: (string | number)[]
): CreateFn<CustomCreators<LeafT, TreeT>> {
  
  const makeCreatorOfType = makeCreatorOfTypeFromPath(path)

  return (passedType?: string) => {
    const creatorOfType = makeCreatorOfType(passedType)
    return {
    }
  }
}

export default makeCustomCreators