import * as R from 'ramda'
import leafReducerDefaults from './defaults';
import LeafReducer from '../../types/Leaf/Reducer';
import LeafReducerConfig from '../../types/Leaf/Reducer/Config';
import LeafReducerFunction from '../../types/Leaf/Reducer/Function';

const standardiseReducersDict = (reducersDict = {}) => {
  return R.mapObjIndexed(
    defineLeafReducer,
    reducersDict
  )
}

const defineLeafReducer = (definition: LeafReducer) => {
  return typeof definition === "function"
    ? defineLeafReducerFromFunction(definition)
    : defineLeafReducerFromConfig(definition)
}

const defineLeafReducerFromConfig = (config: LeafReducerConfig) => ({
  ...leafReducerDefaults,
  ...config
})

const defineLeafReducerFromFunction = (callback: LeafReducerFunction) => (
  defineLeafReducerFromConfig({ reducer: callback })
)

export default standardiseReducersDict