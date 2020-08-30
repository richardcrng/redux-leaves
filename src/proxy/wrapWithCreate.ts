import makeUniversalCreators from '../universal/makeUniversalCreators'
import makeTypedCreators from '../create/makeTypedCreators'
import { RiducerDict } from '../types'
import makeCustomCreators from '../custom/makeCustomCreators'

function wrapWithCreate<
  LeafT,
  TreeT,
  RiducerDictT extends RiducerDict<TreeT>
>(
  leafState: LeafT,
  treeState: TreeT,
  riducerDict: RiducerDictT,
  path: (string | number)[] = []
) {  
  const universalCreators = makeUniversalCreators(leafState, path)
  const typedCreators = makeTypedCreators(leafState, path)
  const customCreators = makeCustomCreators(leafState, treeState, path, riducerDict)
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