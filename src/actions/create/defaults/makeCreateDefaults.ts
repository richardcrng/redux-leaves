import { snakeCase } from 'change-case'
import leafReducerDefaults from "../../../reducersDict/standardise/defaults"
import { atomicActions } from '../../atomic'
import { LeafCreatorDefaults } from '../../../types/creators.type'
import { LeafActionData, LeafStandardAction } from '../../../types/action.type'

type LeafActionTypeCreator = (data: LeafActionData) => string

function makeCreateDefaults<TS, LS>(path: (string | number)[]) {
  const createDefaults = (actionType?: string | LeafActionTypeCreator): LeafCreatorDefaults<LS, TS> => {
    const producerOfLeafStandardActions = makeProducerOfLeafStandardActions(actionType)(path)
    // @ts-ignore
    return {
      assign: (...sources: object[]) => producerOfLeafStandardActions(atomicActions.ASSIGN)(sources),
      clear: (toNull: boolean = false) => producerOfLeafStandardActions(atomicActions.CLEAR)(toNull),
      concat: (arrayOrString: any[] | string) => producerOfLeafStandardActions(atomicActions.CONCAT)(arrayOrString),
      do: (callback: (leafState: any, treeState: any) => any) => producerOfLeafStandardActions(atomicActions.DO)(callback),
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
    } as LeafCreatorDefaults<LS, TS>
  }

  return createDefaults
}


const makeProducerOfLeafStandardActions = (actionType: string | LeafActionTypeCreator = leafReducerDefaults.actionType) => {
  return (path: (string | number)[]) => (creatorKey: string) => (payload?: any): LeafStandardAction => {
    const CREATOR_KEY = snakeCase(creatorKey).toUpperCase()
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