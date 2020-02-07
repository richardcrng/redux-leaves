import LeafCreatorAPIDefaults from './Defaults';
import LeafCreatorAPICustoms from './Customs';
import LeafReducerDict from '../../Reducer/Dict';
import Dict from '../../../Dict';

type LeafCreatorAPI<RD = LeafReducerDict, LS = any, TS = Dict<any>> = LeafCreatorAPIDefaults<TS, LS> & LeafCreatorAPICustoms<RD>

export default LeafCreatorAPI