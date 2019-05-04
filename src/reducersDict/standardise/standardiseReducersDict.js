import _ from 'lodash';
import { leafReducerDefaults } from './defaults';

export const standardiseReducersDict = (reducersDict = {}) => {
  return _.mapValues(
    reducersDict,
    defineLeafReducer
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