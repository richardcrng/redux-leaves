import makeUniversalCreators from '../create/makeUniversalCreators'
import makeTypedCreators from '../create/makeTypedCreators'

// type WrappedWithCreate<T, C> = T & { create: CreateFn<C> }

function wrapWithCreate<S, T>(
  state: S,
  path: (string | number)[] = []
) {  
  const universalCreators = makeUniversalCreators(state, path)
  const typedCreators = makeTypedCreators(state, path)
  const makeCreators = (passedType?: string) => {
    return Object.assign(universalCreators(passedType), typedCreators(passedType))
  }

  const create = Object.assign(makeCreators, makeCreators())

  return Object.assign({ create }, state)
}

export default wrapWithCreate