import makeCreatorOfTypeFromPath from '../create/makeCreatorOfTypeFromPath';
import { CreateFn, RiducerDict, CustomCreators, isLonghandReducer } from '../types';

function makeCustomCreators<
  LeafT,
  TreeT,
  RiducerDictT extends RiducerDict<TreeT>
>(
  leafState: LeafT,
  treeState: TreeT,
  path: (string | number)[],
  riducerDict: RiducerDictT
): CreateFn<CustomCreators<LeafT, TreeT, RiducerDictT>> {
  
  const makeCreatorOfType = makeCreatorOfTypeFromPath(path, true)

  return (passedType?: string) => {
    const creatorOfType = makeCreatorOfType(passedType)
    
    const entries = Object.entries(riducerDict)

    const creators = entries.reduce(
      (acc, [key, definition]) => {
        if (isLonghandReducer(definition)) {
          const { argsToPayload, type } = definition
          return {
            ...acc,
            [key]: (...args: Parameters<typeof argsToPayload>) => creatorOfType(key, argsToPayload(...args), type)
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

    return creators as CustomCreators<LeafT, TreeT, RiducerDictT>
  }
}

export default makeCustomCreators