import LeafCreatorAPIDefaults from './Defaults';
import LeafCreatorAPICustoms from './Customs';
import LeafReducerDict from '../../Reducer/Dict';

type LeafCreatorAPI<T = LeafReducerDict> = LeafCreatorAPIDefaults & LeafCreatorAPICustoms<T>

export default LeafCreatorAPI