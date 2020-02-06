import LeafCreatorAPIDefaults from './Defaults';
import Dict from '../../../Dict';
import LeafStandardActionCreator from '../../../Actions/LSA/Creator';

type LeafCreatorAPI = LeafCreatorAPIDefaults & {
  custom?: Dict<LeafStandardActionCreator>
}

export default LeafCreatorAPI