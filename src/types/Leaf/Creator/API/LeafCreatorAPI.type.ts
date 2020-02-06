import LeafCreatorAPIUniversal from './Universal';
import Dict from '../../../Dict';
import LeafStandardActionCreator from '../../../Actions/LSA/Creator';

type LeafCreatorAPI = LeafCreatorAPIUniversal & {
  custom?: Dict<LeafStandardActionCreator>
}

export default LeafCreatorAPI