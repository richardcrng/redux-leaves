import leafReducerDefaults from './defaults';
import LeafReducer from '../../types/Leaf/Reducer';
import LeafReducerConfig from '../../types/Leaf/Reducer/Config';
import LeafReducerFunction from '../../types/Leaf/Reducer/Function';
import { Dictionary } from 'ramda';
import LeafReducerDict from '../../types/Leaf/Reducer/Dict';

const standardiseReducersDict = <T extends Dictionary<LeafReducer> = Dictionary<LeafReducer>>(reducersDict: T): LeafReducerDict<T> => {
  const reducerEntries = Object.entries(reducersDict)
  const reducerConfigEntries = reducerEntries.map(([creatorKey, reducer]) => ([
    creatorKey,
    defineLeafReducer(reducer)
  ]))

  const reducerConfigDict: LeafReducerDict<T> = Object.fromEntries(reducerConfigEntries)

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