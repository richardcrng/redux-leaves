import makeCreatorOfTypeFromPath from '../create/makeCreatorOfTypeFromPath';
import { CreateFn, CustomReducers, CustomCreators, isLonghandReducer } from '../types';

function makeCustomCreators<
  LeafT,
  TreeT,
  CustomReducersT extends CustomReducers<TreeT>
>(
  leafState: LeafT,
  treeState: TreeT,
  path: (string | number)[],
  reducersDict: CustomReducersT
): CreateFn<CustomCreators<LeafT, TreeT, CustomReducersT>> {
  
  const makeCreatorOfType = makeCreatorOfTypeFromPath(path, true)

  return (passedType?: string) => {
    const creatorOfType = makeCreatorOfType(passedType)
    
    const entries = Object.entries(reducersDict)

    const creators = entries.reduce(
      (acc, [key, definition]) => {
        if (isLonghandReducer(definition)) {
          const { argsToPayload } = definition
          return {
            ...acc,
            [key]: (...args: Parameters<typeof argsToPayload>) => creatorOfType(key, argsToPayload(...args))
          }
        } else {
          const argsToPayload = (first: any) => first
          return {
            ...acc,
            [key]: (...args: Parameters<typeof argsToPayload>) => creatorOfType(key, argsToPayload(...args))
          }
        }
      },
      {}
    )

    return creators as CustomCreators<LeafT, TreeT, CustomReducersT>
  }
}

export default makeCustomCreators