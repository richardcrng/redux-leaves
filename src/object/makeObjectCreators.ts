import makeCreatorOfTypeFromPath from '../create/makeCreatorOfTypeFromPath';
import { CreateFn } from '../types';
import { ObjectCreators, ObjectCreatorKeys } from './object-types';

function makeObjectCreators<L extends {}, T>(leafState: L, path: (string | number)[]): CreateFn<ObjectCreators<L, T>> {
  const makeCreatorOfType = makeCreatorOfTypeFromPath(path)
  return (passedType?: string) => {
    const creatorOfType = makeCreatorOfType(passedType)
    return {
      assign: (props: L) => creatorOfType(ObjectCreatorKeys.ASSIGN, props),
      path: (route, value) => creatorOfType(ObjectCreatorKeys.PATH, { path: route, value }),
      pushedSet: (arg: any) => creatorOfType(ObjectCreatorKeys.PUSHED_SET, arg)
    }
  }
}

export default makeObjectCreators