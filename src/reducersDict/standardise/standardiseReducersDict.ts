import leafReducerDefaults from './defaults';
import objectMap from '../../utils/objectMap';
import { Dict } from '../../types/util.type';
import { LeafReducerDefinition, LeafReducerConfig, LeafReducerFunction, StandardisedLeafReducer, StandardisedReducersDict } from '../../types/reducer.type';


const standardiseReducersDict = <ReducersDict extends Dict<LeafReducerDefinition> = any>(reducersDict: ReducersDict): StandardisedReducersDict<ReducersDict> => {

  const reducerConfigDict = objectMap(([creatorKey, reducer]) => ([
    creatorKey,
    defineLeafReducer(reducer)
  ]), reducersDict)

  // @ts-ignore
  return reducerConfigDict
}

const defineLeafReducer = (definition: LeafReducerDefinition): LeafReducerConfig => {
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