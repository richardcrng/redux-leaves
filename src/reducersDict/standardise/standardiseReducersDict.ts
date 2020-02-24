import leafReducerDefaults from './defaults';
import objectMap from '../../utils/objectMap';
import { Dict } from '../../types/util.type';
import LeafReducer from '../../types/reducer.type';

/**
 * 
 * @param reducersDict - Dictionary of leaf reducer definitions
 * 
 * @template RD - ReducersDict
 */
function standardiseReducersDict<RD extends Dict<LeafReducer.Configuration> = any>(
  reducersDict: RD
): LeafReducer.Dictionary<RD> {

  const reducerConfigDict = objectMap(([creatorKey, reducer]) => ([
    creatorKey,
    defineLeafReducer(reducer)
  ]), reducersDict)

  // @ts-ignore
  return reducerConfigDict
}

const defineLeafReducer = (definition: LeafReducer.Configuration): LeafReducer.ConfigObj => {
  return typeof definition === "function"
    ? defineLeafReducerFromFunction(definition)
    : defineLeafReducerFromConfig(definition)
}

const defineLeafReducerFromConfig = (config: LeafReducer.ConfigObj): LeafReducer.ConfigObj => ({
  ...leafReducerDefaults,
  ...config
})

const defineLeafReducerFromFunction = (reducer: LeafReducer.ReducerFunction): LeafReducer.ConfigObj => (
  defineLeafReducerFromConfig({ reducer })
)

export default standardiseReducersDict