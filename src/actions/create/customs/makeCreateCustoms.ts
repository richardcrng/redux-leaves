import { snakeCase } from 'change-case'
import leafReducerDefaults from "../../../reducersDict/standardise/defaults"
import LeafStandardAction from "../../../types/Actions/LSA"
import LeafActionData from '../../../types/Leaf/Action/Data'
import LeafReducerConfig from '../../../types/Leaf/Reducer/Config'
import LeafStandardActionCreator from '../../../types/Actions/LSA/Creator'
import LeafCreatorAPICustoms from '../../../types/Leaf/Creator/API/Customs'
import LeafReducerDict from '../../../types/Leaf/Reducer/Dict'
import objectMap from '../../../utils/objectMap'
import LeafActionTypeConfig from '../../../types/Leaf/Action/Type/Config'

type LeafActionTypeCreator = (data: LeafActionData) => string

/**
 * Returns the Redux-Leaves create API function for custom reducers/creators.
 * 
 * @param path - The path to the state leaf
 * @param reducersDict - A standardised dictionary of leaf reducers
 * @returns The Redux-Leaves create API function for custom reducers/creators.
 */
function makeCreateCustoms<RD = LeafReducerDict>(
  path: (string | number)[],
  reducersDict: RD
) {
  return function createCustoms(
    actionType?: string | LeafActionTypeCreator
  ): LeafCreatorAPICustoms<RD> {
    const customs = objectMap<keyof RD, LeafReducerConfig, keyof RD, LeafStandardActionCreator>(
      ([creatorKey, leafReducerConfig]) => ([
        creatorKey as keyof RD,
        leafReducerConfigToCreator(leafReducerConfig, creatorKey, path, actionType)
        // @ts-ignore
    ]), reducersDict)

    return customs
  }
}

const leafReducerConfigToCreator = (
  leafReducer: LeafReducerConfig,
  creatorKey: string,
  path: (string | number)[],
  actionType?: string | LeafActionTypeCreator
): LeafStandardActionCreator => {
  
  const { argsToPayload = leafReducerDefaults.argsToPayload, type: configType = leafReducerDefaults.actionType } = leafReducer;
  const { leaf, type } = actionPrePayload({ path, creatorKey, actionType, configType })

  return (...args: any[]): LeafStandardAction => {
    const payload = argsToPayload(...args)
    return {
      leaf,
      type,
      payload
    }
  }
}

const actionPrePayload = ({ path, creatorKey, actionType, configType }: {
  path: (string | number)[]
  creatorKey: string
  actionType?: string | LeafActionTypeCreator
  configType: LeafActionTypeConfig
}) => {
  const CREATOR_KEY = snakeCase(creatorKey).toUpperCase()
  const leaf: LeafActionData = { path, creatorKey, CREATOR_KEY, custom: true, compound: false }
  const type = determineActionType(leaf, configType, actionType)
  return { leaf, type }
}

const determineActionType = (leaf: LeafActionData, configType: LeafActionTypeConfig, actionType?: string | LeafActionTypeCreator) => (
  actionType
    ? (typeof actionType === "function")
      ? actionType(leaf)
      : actionType
    : (typeof configType === 'function')
      ? configType(leaf)
      : configType
)

export default makeCreateCustoms