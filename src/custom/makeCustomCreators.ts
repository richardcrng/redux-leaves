import makeCreatorOfTypeFromPath from '../create/makeCreatorOfTypeFromPath';
import { CreateFn, CustomReducers } from '../types';

function makeCustomCreators<LeafT, TreeT>(
  leafState: LeafT,
  path: (string | number)[],
  reducersDict: CustomReducers<TreeT>
) {
  
  const makeCreatorOfType = makeCreatorOfTypeFromPath(path)

  return (passedType?: string) => {
    const creatorOfType = makeCreatorOfType(passedType)
    return {
    }
  }
}

export default makeCustomCreators