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
function standardiseReducersDict<RD extends Dict<LeafReducer.Definition> = any>(
  reducersDict: RD
): LeafReducer.Dictionary<RD> {

  const reducerConfigDict = objectMap(([creatorKey, reducer]) => ([
    creatorKey,
    defineLeafReducer(reducer)
  ]), reducersDict)

  // @ts-ignore
  return reducerConfigDict
}

const defineLeafReducer = (definition: LeafReducer.Definition): LeafReducer.Config => {
  return typeof definition === "function"
    ? defineLeafReducerFromFunction(definition)
    : defineLeafReducerFromConfig(definition)
}

const defineLeafReducerFromConfig = (config: LeafReducer.Config): LeafReducer.Config => ({
  ...leafReducerDefaults,
  ...config
})

const defineLeafReducerFromFunction = (reducer: LeafReducer.Function): LeafReducer.Config => (
  defineLeafReducerFromConfig({ reducer })
)

export default standardiseReducersDict