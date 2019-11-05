import * as R from 'ramda'
import leafReducerDefaults from "../../../reducersDict/standardise/defaults"
import LeafStandardAction from "../../../types/Actions/LSA"
import LeafActionData from '../../../types/Leaf/Action/Data'
import Dict from '../../../types/Dict'
import LeafReducerConfig from '../../../types/Leaf/Reducer/Config'
import LeafStandardActionCreator from '../../../types/Actions/LSA/Creator'

const changeCase = require('change-case')

type LeafActionTypeCreator = (data: LeafActionData) => string

const makeCreateCustoms = (path: string[], reducersDict: Dict<LeafReducerConfig> = {}) => (actionType?: string | LeafActionTypeCreator) => {
  const leafReducerConfigToCreator = makeProducerOfLeafReducerConfigToCreator(actionType)

  return R.mapObjIndexed(
    leafReducerConfigToCreator(path),
    reducersDict
  )
}

const makeProducerOfLeafReducerConfigToCreator = (actionType?: string | LeafActionTypeCreator) => {
  const leafReducerConfigToCreator = R.curry((path: string[], leafReducer: LeafReducerConfig, creatorKey: string): LeafStandardActionCreator => {
    const { argsToPayload = R.identity, type: configType = leafReducerDefaults.actionType } = leafReducer;

    const CREATOR_KEY = changeCase.snakeCase(creatorKey).toUpperCase()
    const leaf: LeafActionData = { path, creatorKey, CREATOR_KEY, custom: true }
    const type = actionType
      ? (typeof actionType === "function")
        ? actionType(leaf)
        : actionType
      : (typeof configType === 'function')
        ? configType(leaf)
        : configType

    return (...args: any[]): LeafStandardAction => {
      const payload = argsToPayload(...args)
      return {
        leaf,
        type,
        payload
      }
    }
  })

  return leafReducerConfigToCreator
}

export default makeCreateCustoms