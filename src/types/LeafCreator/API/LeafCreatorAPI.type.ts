import LeafCreatorAPIUniversal from './Universal';
import LeafCreatorAPIAsArray from './AsArray/LeafCreatorAPIAsArray.type';

type LeafCreatorAPI = LeafCreatorAPIUniversal & {
  asArray: LeafCreatorAPIAsArray
}

export default LeafCreatorAPI