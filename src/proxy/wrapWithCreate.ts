import makeUniversalCreators from '../universal/makeUniversalCreators'
import makeTypedCreators from '../create/makeTypedCreators'
import { CustomReducers } from '../types'
import makeCustomCreators from '../custom/makeCustomCreators'

function wrapWithCreate<
  LeafT,
  TreeT,
  CustomReducersT extends CustomReducers<TreeT>
>(
  leafState: LeafT,
  treeState: TreeT,
  reducersDict: CustomReducersT,
  path: (string | number)[] = []
) {  
  const universalCreators = makeUniversalCreators(leafState, path)
  const typedCreators = makeTypedCreators(leafState, path)
  const customCreators = makeCustomCreators(leafState, treeState, path, reducersDict)
  const makeCreators = (passedType?: string) => {
    return Object.assign(
      universalCreators(passedType),
      typedCreators(passedType),
      customCreators(passedType)
    )
  }

  const create = Object.assign(makeCreators, makeCreators())

  return Object.assign({ create }, leafState)
}

export default wrapWithCreate