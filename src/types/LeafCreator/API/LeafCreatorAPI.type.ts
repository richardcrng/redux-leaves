import LeafCreatorAPIUniversal from './Universal';
import LeafCreatorAPIAsArray from './AsArray/LeafCreatorAPIAsArray.type';
import LeafCreatorAPIAsBoolean from './AsBoolean';
import LeafCreatorAPIAsString from './AsString';
import LeafCreatorAPIAsNumber from './AsNumber';

type LeafCreatorAPI = LeafCreatorAPIUniversal & {
  asArray: LeafCreatorAPIAsArray
  asBoolean: LeafCreatorAPIAsBoolean
  asNumber: LeafCreatorAPIAsNumber
  asString: LeafCreatorAPIAsString
}

export default LeafCreatorAPI