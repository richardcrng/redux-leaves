import * as R from 'ramda'
import leafReducerDefaults from "../../../reducersDict/standardise/defaults"
import LeafStandardAction from "../../../types/Actions/LSA"
import LeafActionData from '../../../types/Leaf/Action/Data'
import Dict from '../../../types/Dict'
import LeafReducerConfig from '../../../types/Leaf/Reducer/Config'
import LeafStandardActionCreator from '../../../types/Actions/LSA/Creator'
import { Dictionary } from 'ramda'
import LeafCreatorAPICustoms from '../../../types/Leaf/Creator/API/Customs'

const changeCase = require('change-case')

type LeafActionTypeCreator = (data: LeafActionData) => string

type LeafReducerConfigToCreatorMaker = (path: (string | number)[]) => LeafReducerConfigToCreator
type LeafReducerConfigToCreator = (leafReducer: LeafReducerConfig, creatorKey: string) => LeafStandardActionCreator 

function makeCreateCustoms<T extends Dictionary<LeafReducerConfig> = Dictionary<LeafReducerConfig>>(
  path: (string | number)[],
  reducersDict: T
) {
  return (actionType?: string | LeafActionTypeCreator): LeafCreatorAPICustoms<T> => {
    const leafReducerConfigToCreator: LeafReducerConfigToCreatorMaker = makeProducerOfLeafReducerConfigToCreator(actionType)

    const customEntries = Object.entries(reducersDict).map(([creatorKey, leafReducerConfig]) => ([
      creatorKey,
      leafReducerConfigToCreator(path)(leafReducerConfig, creatorKey)
    ]))

    const customs: LeafCreatorAPICustoms<T> = Object.fromEntries(customEntries)

    return customs
  }
}

const makeProducerOfLeafReducerConfigToCreator = (actionType?: string | LeafActionTypeCreator) => {
  const leafReducerConfigToCreator: LeafReducerConfigToCreatorMaker = (path: (string | number)[]) => (leafReducer: LeafReducerConfig, creatorKey: string): LeafStandardActionCreator => {
    const { argsToPayload = R.identity, type: configType = leafReducerDefaults.actionType } = leafReducer;

    const CREATOR_KEY = changeCase.snakeCase(creatorKey).toUpperCase()
    const leaf: LeafActionData = { path, creatorKey, CREATOR_KEY, custom: true, compound: false }
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
  }

  return leafReducerConfigToCreator
}

export default makeCreateCustoms