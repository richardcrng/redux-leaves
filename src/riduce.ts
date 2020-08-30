import { Reducer } from 'react'
import { createActionsProxy } from "./proxy"
import { ActionsProxy } from "./proxy/createActionsProxy"
import { LeafStandardAction, CustomReducers, isLeafCompoundAction } from './types';
import updateState, { getState } from './utils/update-state';
import leafReducer from './leafReducer';

export type ReduxLeaves<
  TreeT,
  CustomReducersT extends CustomReducers<TreeT> = {}
> = [
  Reducer<TreeT, LeafStandardAction>,
  ActionsProxy<TreeT, TreeT, CustomReducersT>
]

function riduce<
  TreeT,
  CustomReducersT extends CustomReducers<TreeT> = {}
>(
  initialState: TreeT,
  reducersDict: CustomReducersT = {} as CustomReducersT
): ReduxLeaves<TreeT, CustomReducersT> {
  const reducer = (treeState: TreeT = initialState, action: LeafStandardAction): TreeT => {
    
    if (!action.leaf) return treeState

    if (isLeafCompoundAction(action)) {
      return action.payload.reduce(reducer, treeState)
    }

    const prevLeafState = getState(treeState, action.leaf.path)

    const newLeafState = leafReducer(prevLeafState, treeState, action, initialState, reducersDict)

    return updateState(treeState, action.leaf.path, newLeafState)
  }

  const actions = createActionsProxy(initialState, initialState, reducersDict)

  return [reducer as Reducer<TreeT, LeafStandardAction>, actions]
}

export default riduce