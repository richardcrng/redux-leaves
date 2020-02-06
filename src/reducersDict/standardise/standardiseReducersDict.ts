import * as R from 'ramda'
import leafReducerDefaults from './defaults';
import LeafReducer from '../../types/Leaf/Reducer';
import LeafReducerConfig from '../../types/Leaf/Reducer/Config';
import LeafReducerFunction from '../../types/Leaf/Reducer/Function';
import { Dictionary } from 'ramda';

const standardiseReducersDict = (reducersDict: Dictionary<LeafReducer> = {}): Dictionary<LeafReducerConfig> => {
  return R.mapObjIndexed(
    defineLeafReducer,
    reducersDict
  )
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