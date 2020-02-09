import leafReducerDefaults from './defaults';
import LeafReducer from '../../types/Leaf/Reducer';
import LeafReducerConfig from '../../types/Leaf/Reducer/Config';
import LeafReducerFunction from '../../types/Leaf/Reducer/Function';
import { Dictionary } from 'ramda';
import LeafReducerDict from '../../types/Leaf/Reducer/Dict';
import objectMap from '../../utils/objectMap';

const standardiseReducersDict = <RD extends Dictionary<LeafReducer> = Dictionary<LeafReducer>>(reducersDict: RD): LeafReducerDict<RD> => {

  const reducerConfigDict = objectMap<keyof RD, LeafReducer, keyof RD, LeafReducerConfig>(([creatorKey, reducer]) => ([
    creatorKey,
    defineLeafReducer(reducer)
  ]), reducersDict)

  return reducerConfigDict
}

const defineLeafReducer = (definition: LeafReducer): LeafReducerConfig => {
  return typeof definition === "function"
    ? defineLeafReducerFromFunction(definition)
    : defineLeafReducerFromConfig(definition)
}

const defineLeafReducerFromConfig = (config: LeafReducerConfig): LeafReducerConfig => ({
  ...leafReducerDefaults,
  ...config
})

const defineLeafReducerFromFunction = (reducer: LeafReducerFunction): LeafReducerConfig => (
  defineLeafReducerFromConfig({ reducer })
)

export default standardiseReducersDict