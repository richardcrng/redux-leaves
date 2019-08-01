import LeafCreatorAPIUniversal from './Universal';
import LeafCreatorAPIAsArray from './AsArray/LeafCreatorAPIAsArray.type';
import LeafCreatorAPIAsBoolean from './AsBoolean';
import LeafCreatorAPIAsString from './AsString';
import LeafCreatorAPIAsNumber from './AsNumber';
import LeafCreatorAPIAsObject from './AsObject';
import Dict from '../../../Dict';
import LeafStandardActionCreator from '../../../Actions/LSA/Creator';

type LeafCreatorAPI = LeafCreatorAPIUniversal & {
  asArray: LeafCreatorAPIAsArray
  asBoolean: LeafCreatorAPIAsBoolean
  asNumber: LeafCreatorAPIAsNumber
  asObject: LeafCreatorAPIAsObject
  asString: LeafCreatorAPIAsString
  custom?: Dict<LeafStandardActionCreator>
}

export type ArrayLeafCreatorAPI = LeafCreatorAPI & LeafCreatorAPIAsArray
export type BooleanLeafCreatorAPI = LeafCreatorAPI & LeafCreatorAPIAsBoolean
export type NumberLeafCreatorAPI = LeafCreatorAPI & LeafCreatorAPIAsNumber
export type ObjectLeafCreatorAPI = LeafCreatorAPI & LeafCreatorAPIAsObject
export type StringLeafCreatorAPI = LeafCreatorAPI & LeafCreatorAPIAsString
export type LeafCreatorAPITyped = ArrayLeafCreatorAPI | BooleanLeafCreatorAPI | NumberLeafCreatorAPI | ObjectLeafCreatorAPI | StringLeafCreatorAPI

export default LeafCreatorAPI