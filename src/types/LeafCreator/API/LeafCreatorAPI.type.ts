import LeafCreatorAPIUniversal from './Universal';
import LeafCreatorAPIAsArray from './AsArray/LeafCreatorAPIAsArray.type';
import LeafCreatorAPIAsBoolean from './AsBoolean';
import LeafCreatorAPIAsString from './AsString';

type LeafCreatorAPI = LeafCreatorAPIUniversal & {
  asArray: LeafCreatorAPIAsArray
  asBoolean: LeafCreatorAPIAsBoolean
  asString: LeafCreatorAPIAsString
}

export default LeafCreatorAPI