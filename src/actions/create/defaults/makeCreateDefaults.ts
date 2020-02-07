import leafReducerDefaults from "../../../reducersDict/standardise/defaults"
import LeafStandardAction from "../../../types/Actions/LSA"
import LeafActionData from '../../../types/Leaf/Action/Data'
import { atomicActions } from '../../atomic'
import LeafCreatorAPIDefaults from "../../../types/Leaf/Creator/API/Defaults"
import Dict from "../../../types/Dict"

const changeCase = require('change-case')

type LeafActionTypeCreator = (data: LeafActionData) => string

function makeCreateDefaults<TS = Dict<any>, LS = any>(path: (string | number)[]) {
  const createDefaults = (actionType?: string | LeafActionTypeCreator): LeafCreatorAPIDefaults<TS, LS> => {
    const producerOfLeafStandardActions = makeProducerOfLeafStandardActions(actionType)(path)
    return {
      apply: (callback: (leafState: any, treeState: any) => any) => producerOfLeafStandardActions(atomicActions.APPLY)(callback),
      assign: (...sources: object[]) => producerOfLeafStandardActions(atomicActions.ASSIGN)(sources),
      clear: (toNull: boolean = false) => producerOfLeafStandardActions(atomicActions.CLEAR)(toNull),
      concat: (arrayOrString: any[] | string) => producerOfLeafStandardActions(atomicActions.CONCAT)(arrayOrString),
      drop: (n: number = 1) => producerOfLeafStandardActions(atomicActions.DROP)(n),
      filter: (callback: (element: any, index: number, array: any[]) => any[]) => producerOfLeafStandardActions(atomicActions.FILTER)(callback),
      increment: (n: number = 1) => producerOfLeafStandardActions(atomicActions.INCREMENT)(n),
      off: () => producerOfLeafStandardActions(atomicActions.OFF)(),
      on: () => producerOfLeafStandardActions(atomicActions.ON)(),
      path: (path: (string | number)[], value: any) => producerOfLeafStandardActions(atomicActions.SET)({ path, value }),
      push: (element: any, index: number = -1, replace: boolean = false) => producerOfLeafStandardActions(atomicActions.PUSH)({ element, index, replace }),
      pushedSet: (value: any) => producerOfLeafStandardActions(atomicActions.PUSHED_SET)(value),
      // replace: (pattern: string | RegExp, replacement: string) => producerOfLeafStandardActions(atomicActions.REPLACE)({ pattern, replacement }),
      reset: () => producerOfLeafStandardActions(atomicActions.RESET)(),
      set: (key: string, value: any) => producerOfLeafStandardActions(atomicActions.SET)({ path: [key], value }),
      toggle: () => producerOfLeafStandardActions(atomicActions.TOGGLE)(),
      update: (newVal: any) => producerOfLeafStandardActions(atomicActions.UPDATE)(newVal)
    } as LeafCreatorAPIDefaults<TS, LS>
  }

  return createDefaults
}


const makeProducerOfLeafStandardActions = (actionType: string | LeafActionTypeCreator = leafReducerDefaults.actionType) => {
  return (path: (string | number)[]) => (creatorKey: string) => (payload?: any): LeafStandardAction => {
    const CREATOR_KEY = changeCase.snakeCase(creatorKey).toUpperCase()
    const leaf: LeafActionData = { path, creatorKey, CREATOR_KEY, compound: false }
    const type = (typeof actionType === "function")
      ? actionType(leaf)
      : actionType

    return {
      leaf,
      type,
      payload
    }
  }
}

export default makeCreateDefaults