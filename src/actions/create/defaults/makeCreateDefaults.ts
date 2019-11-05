import * as R from 'ramda'
import leafReducerDefaults from "../../../reducersDict/standardise/defaults"
import LeafStandardAction from "../../../types/Actions/LSA"
import LeafActionData from '../../../types/Leaf/Action/Data'
import { atomicActions } from '../../atomic'

const changeCase = require('change-case')

type LeafActionTypeCreator = (data: LeafActionData) => string

const makeProducerOfLeafStandardActions = (actionType: string | LeafActionTypeCreator = leafReducerDefaults.actionType) => {
  return R.curry((path: string[], creatorKey: string, payload: any): LeafStandardAction => {
    const CREATOR_KEY = changeCase.snakeCase(creatorKey).toUpperCase()
    const leaf = { path, creatorKey, CREATOR_KEY }
    const type = (typeof actionType === "function")
      ? actionType(leaf)
      : actionType

    return {
      leaf,
      type,
      payload
    }
  })
}

const makeCreateDefaults = R.curry((path: string[], actionType: string | LeafActionTypeCreator) => {
  const producerOfLeafStandardActions = makeProducerOfLeafStandardActions(actionType)(path)

  return {
    apply: producerOfLeafStandardActions( atomicActions.APPLY),
    assign: producerOfLeafStandardActions( atomicActions.ASSIGN),
    clear: producerOfLeafStandardActions( atomicActions.CLEAR),
    drop: producerOfLeafStandardActions(atomicActions.DROP),
    update: producerOfLeafStandardActions( atomicActions.UPDATE)
  }
})

export default makeCreateDefaults