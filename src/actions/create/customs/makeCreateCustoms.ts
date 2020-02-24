import { snakeCase } from 'change-case'
import leafReducerDefaults from "../../../reducersDict/standardise/defaults"
import objectMap from '../../../utils/objectMap'
import { LeafActionData, LeafStandardAction, LeafActionTypeConfig } from '../../../types/action.type'
import { LeafCreatorCustoms } from '../../../types/creators.type'
import { LeafReducer } from '../../../types/reducer.type'
import { LeafStandardActionCreator } from '../../../types/creator.type'

type LeafActionTypeCreator = (data: LeafActionData) => string

/**
 * Returns the Redux-Leaves create API function for custom reducers/creators.
 * 
 * @param path - The path to the state leaf
 * @param reducersDict - A standardised dictionary of leaf reducers
 * @returns The Redux-Leaves create API function for custom reducers/creators.
 * 
 * @template RD - Standardised Reducer Dictionary
 * @template LRD - Leaf Reducer Definitions
 */
function makeCreateCustoms<RD, LRD extends LeafReducer.Definitions>(
  path: (string | number)[],
  reducersDict: RD
) {
  return function createCustoms(
    actionType?: string | LeafActionTypeCreator
  ): LeafCreatorCustoms<LRD> {
    const customs = objectMap(
      ([creatorKey, leafReducerConfig]) => ([
        creatorKey,
        leafReducerConfigToCreator<typeof leafReducerConfig>(leafReducerConfig, creatorKey, path, actionType)
    ]), reducersDict)

    // @ts-ignore
    return customs
  }
}

/**
 * 
 * @param leafReducer 
 * @param creatorKey 
 * @param path 
 * @param actionType 
 * 
 * @template C - LeafReducer.ConfigObj
 */
const leafReducerConfigToCreator = <C extends LeafReducer.ConfigObj = LeafReducer.ConfigObj>(
  leafReducer: C,
  creatorKey: string,
  path: (string | number)[],
  actionType?: string | LeafActionTypeCreator
): LeafStandardActionCreator<LeafReducer.CreatorArgs<C>, LeafReducer.CreatedPayload<C>> => {
  
  const {
    argsToPayload = leafReducerDefaults.argsToPayload,
    type: configType = leafReducerDefaults.actionType
  } = leafReducer;
  const { leaf, type } = actionPrePayload({ path, creatorKey, actionType, configType })

  return (...args: LeafReducer.CreatorArgs<C>): LeafStandardAction<LeafReducer.CreatedPayload<C>> => {
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