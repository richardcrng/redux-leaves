import leafReducerDefaults from './defaults';
import objectMap from '../../utils/objectMap';
import { Dict } from '../../types/util.type';
import { LeafReducer, StandardisedReducersDict } from '../../types/reducer.type';


const standardiseReducersDict = <ReducersDict extends Dict<LeafReducer.Definition> = any>(reducersDict: ReducersDict): StandardisedReducersDict<ReducersDict> => {

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