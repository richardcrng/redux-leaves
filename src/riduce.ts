import { Reducer as ReactReducer } from 'react'
import { Reducer as ReduxReducer } from 'redux'
import { createActionsProxy } from "./proxy"
import { ActionsProxy } from "./proxy/createActionsProxy"
import { Action, RiducerDict, isBundledAction } from './types';
import updateState, { getState } from './utils/update-state';
import leafReducer from './leafReducer';

export type ReduxLeaves<
  TreeT,
  RiducerDictT extends RiducerDict<TreeT> = {}
> = [
  ReactReducer<TreeT, Action>,
  ActionsProxy<TreeT, TreeT, RiducerDictT>
]

function riduce<
  TreeT,
  RiducerDictT extends RiducerDict<TreeT> = {}
>(
  initialState: TreeT,
  riducerDict: RiducerDictT = {} as RiducerDictT
): ReduxLeaves<TreeT, RiducerDictT> {
  const reducer = (treeState: TreeT = initialState, action: Action): TreeT => {
    
    if (!action.leaf) return treeState

    if (isBundledAction(action)) {
      return action.payload.reduce(reducer, treeState)
    }

    const prevLeafState = getState(treeState, action.leaf.path)

    const newLeafState = leafReducer(prevLeafState, treeState, action, initialState, riducerDict)

    return updateState(treeState, action.leaf.path, newLeafState)
  }

  const actions = createActionsProxy(initialState, initialState, riducerDict)

  return [reducer as ReactReducer<TreeT, Action>, actions]
}

export default riduce