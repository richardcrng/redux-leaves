import makeUniversalCreators from '../universal/makeUniversalCreators'
import makeTypedCreators from '../create/makeTypedCreators'

// type WrappedWithCreate<T, C> = T & { create: CreateFn<C> }

function wrapWithCreate<LeafT, TreeT>(
  leafState: LeafT,
  path: (string | number)[] = []
) {  
  const universalCreators = makeUniversalCreators(leafState, path)
  const typedCreators = makeTypedCreators(leafState, path)
  const makeCreators = (passedType?: string) => {
    return Object.assign(universalCreators(passedType), typedCreators(passedType))
  }

  const create = Object.assign(makeCreators, makeCreators())

  return Object.assign({ create }, leafState)
}

export default wrapWithCreate