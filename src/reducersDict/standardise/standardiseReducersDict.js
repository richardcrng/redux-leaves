import * as R from 'ramda'
import { leafReducerDefaults } from './defaults';

export const standardiseReducersDict = (reducersDict = {}) => {
  return R.mapObjIndexed(
    defineLeafReducer,
    reducersDict
  )
}

const defineLeafReducer = definition => {
  return typeof definition === "function"
    ? defineLeafReducerFromFunction(definition)
    : defineLeafReducerFromConfig(definition)
}

const defineLeafReducerFromConfig = config => ({
  ...leafReducerDefaults,
  ...config
})

const defineLeafReducerFromFunction = callback => (
  defineLeafReducerFromConfig({ reducer: callback })
)