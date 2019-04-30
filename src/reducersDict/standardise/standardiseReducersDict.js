import _ from 'lodash';
import { argsToPayload, makeType } from './defaults/index';

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
  argsToPayload,
  makeType,
  ...config
})

const defineLeafReducerFromFunction = callback => (
  defineLeafReducerFromConfig({ reducer: callback })
)