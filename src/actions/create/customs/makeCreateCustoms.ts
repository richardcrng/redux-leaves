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
 */
function makeCreateCustoms<RD>(
  path: (string | number)[],
  reducersDict: RD
) {
  return function createCustoms(
    actionType?: string | LeafActionTypeCreator
  ): LeafCreatorCustoms<RD> {
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
 * @template C - LeafReducer.Config
 */
const leafReducerConfigToCreator = <C extends LeafReducer.Config = LeafReducer.Config>(
  leafReducer: C,
  creatorKey: string,
  path: (string | number)[],
  actionType?: string | LeafActionTypeCreator
): LeafStandardActionCreator<LeafReducer.CreatorArgs<C>> => {
  
  const { argsToPayload, type: configType = leafReducerDefaults.actionType } = leafReducer;
  const { leaf, type } = actionPrePayload({ path, creatorKey, actionType, configType })

  return (...args: LeafReducer.CreatorArgs<C>): LeafStandardAction<LeafReducer.CreatedPayload<C>> => {
    const payload = argsToPayload
      ? argsToPayload(...args)
      : leafReducerDefaults.argsToPayload(...args)

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