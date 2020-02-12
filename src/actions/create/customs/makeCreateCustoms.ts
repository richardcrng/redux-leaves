import * as R from 'ramda'
import leafReducerDefaults from "../../../reducersDict/standardise/defaults"
import LeafStandardAction from "../../../types/Actions/LSA"
import LeafActionData from '../../../types/Leaf/Action/Data'
import LeafReducerConfig from '../../../types/Leaf/Reducer/Config'
import LeafStandardActionCreator from '../../../types/Actions/LSA/Creator'
import LeafCreatorAPICustoms from '../../../types/Leaf/Creator/API/Customs'
import LeafReducerDict from '../../../types/Leaf/Reducer/Dict'
import objectMap from '../../../utils/objectMap'

const changeCase = require('change-case')

type LeafActionTypeCreator = (data: LeafActionData) => string

type LeafReducerConfigToCreatorMaker = (path: (string | number)[]) => LeafReducerConfigToCreator
type LeafReducerConfigToCreator = (leafReducer: LeafReducerConfig, creatorKey: string) => LeafStandardActionCreator 

function makeCreateCustoms<RD>(
  path: (string | number)[],
  reducersDict: RD
) {
  return (actionType?: string | LeafActionTypeCreator): LeafCreatorAPICustoms<RD> => {
    const leafReducerConfigToCreator: LeafReducerConfigToCreatorMaker = makeProducerOfLeafReducerConfigToCreator(actionType)

    const customs = objectMap<keyof RD, LeafReducerConfig, keyof RD, LeafStandardActionCreator>(([creatorKey, leafReducerConfig]) => ([
      creatorKey as keyof RD,
      leafReducerConfigToCreator(path)(leafReducerConfig, creatorKey)
      // @ts-ignore
    ]), reducersDict)

    return customs
  }
}

const makeProducerOfLeafReducerConfigToCreator = (actionType?: string | LeafActionTypeCreator) => {
  const leafReducerConfigToCreator: LeafReducerConfigToCreatorMaker = (path: (string | number)[]) => (leafReducer: LeafReducerConfig, creatorKey: string): LeafStandardActionCreator => {
    const {
      argsToPayload = leafReducerDefaults.argsToPayload,
      type: configType = leafReducerDefaults.actionType
    } = leafReducer;

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