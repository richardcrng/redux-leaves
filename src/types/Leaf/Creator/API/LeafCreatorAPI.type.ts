import LeafCreatorAPIDefaults from './Defaults';
import { Dictionary } from 'ramda';
import LeafReducerConfig from '../../Reducer/Config';
import LeafCreatorAPICustoms from './Customs';

type LeafCreatorAPI<T extends Dictionary<LeafReducerConfig>> = LeafCreatorAPIDefaults & LeafCreatorAPICustoms<T>

export default LeafCreatorAPI