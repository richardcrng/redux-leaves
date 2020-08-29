import { Reducer } from 'redux'
import { createActionsProxy } from "./proxy"
import { ActionsProxy } from "./proxy/createActionsProxy"
import { LeafStandardAction, CustomReducers } from './types';
import updateState, { getState } from './utils/update-state';
import leafReducer from './leafReducer';

export type ReduxLeaves<TreeT> = [
  Reducer<TreeT>,
  ActionsProxy<TreeT, TreeT>
]

function reduxLeaves<TreeT>(
  initialState: TreeT,
  reducersDict: CustomReducers<TreeT>
): ReduxLeaves<TreeT> {
  const reducer = (treeState: TreeT = initialState, action: LeafStandardAction) => {
    if (!action.leaf) return treeState

    const prevLeafState = getState(treeState, action.leaf.path)

    const newLeafState = leafReducer(prevLeafState, treeState, action, initialState)

    return updateState(treeState, action.leaf.path, newLeafState)
  }

  const actions = createActionsProxy<TreeT, TreeT>(initialState)

  return [reducer as Reducer<TreeT>, actions]
}

export default reduxLeaves